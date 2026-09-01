---
title: "Pointing Claude Code at a local model"
date: 2026-08-30
tag: ai
tagLabel: "AI / LLM"
---

I started a Claude Code workflow, walked away from it, and came back two days
later to find it still running. That's how I hit my usage limits.

Most of what I hand it doesn't need a frontier model anyway. Writing a commit
message from a diff, summarising a stack trace, turning a wall of meeting notes
into a ticket - it all costs the same as the work I actually want the good
model for, and I've been meaning to push the cheap end of that onto my own
hardware for about as long as I've been using Claude Code.

Qwen3.8-27B is what made me finally do it. It was getting a lot of hype and I
wanted to give it a spin, and with 96GB of unified memory in the Mac Studio
there was nothing left to wait for.

I've had local models running on and off, but always in a chat window or behind
a one-off script, never something that had to hold a tool loop together. I
already run several models against each other: Opus and Fable plan and
orchestrate, Sonnet implements most of what they come up with, and Haiku picks
up the smaller tasks inside those workflows. The question was whether Qwen
could sit somewhere between Sonnet and Haiku for implementation work, which
meant it had to be available alongside the others in the same session, with
everything that isn't local still going through my Claude Code subscription.

That looked like an afternoon. Claude Code reads `ANTHROPIC_BASE_URL`,
`llama-server` speaks HTTP over localhost, and the two of them should be able to
sort it out. It took a weekend. Claude Code won't accept the model name, and
once you force it past that, it can't speak to what's on the other end.

## The enum

Claude Code's Agent tool declares its `model` parameter as a zod enum:

```js
model: ie(["sonnet","opus","haiku","fable"]).optional().describe(
  `Optional model override for this agent. ...`)
```

Any other string fails validation at the schema. You never get an API error,
because no request is ever built.

Claude Code ships as a bun-compiled Mach-O. The JS lives in a custom `__BUN`
segment (for 2.1.251: fileoff 66191360, 130MB), which holds JSC bytecode, a
plain-JS source blob, and a string table. The enum literal is a plain string in
that segment and appears exactly once.

You can't change the literal's *length*: it lives in a fixed-size region where
shifting bytes breaks every offset after it — the module table's pointers, the
container's size prefix, the Mach-O load commands. Keep the length identical and
the rest of the file stays bit-identical. So the patch is an equal-length byte
splice. The original is 37 bytes:

```
ie(["sonnet","opus","haiku","fable"])     37 bytes
i()/*                              */     37 bytes
```

`i` is `z.string()` and is already in scope, since it's what the sibling
`subagent_type` field uses. The block comment is padding. Re-sign with
`codesign --force -s -` and it runs.

## Surviving minification

That patch worked. Then Claude Code updated, and it stopped existing.

In 2.1.241 the enum wrapper minified to `Dr` and the string helper to `H`. In
2.1.251 they were `ie` and `i`. The code didn't change, only the letters did, so
a search for the old literal returns nothing and you're back to carving the
segment out of the binary and grepping 4MB of minified JavaScript to find where
the model parameter went.

The fix is to stop matching on anything the minifier controls. Minifiers rename
identifiers; they don't rewrite English. That `describe()` call is documentation
shipped to the model at runtime, so it survives verbatim.

My first version was a regex with the prose in it and the symbol as a capture
group. It derived both binaries correctly and it was still wrong, in a way I
didn't find until later. A recipe is now a pair of ast-grep rules over the
parsed JavaScript:

```yaml
rule:
  all:
    - pattern: $ANY.optional().describe($D)
    - regex: "Optional model override for this agent"
```

The pattern finds the call chains and the prose picks out the one I want. The
node I actually replace is the `X(...)` receiver, and I get to it by walking
fields, `chain.function.object.function.object`, instead of searching inside the
match.

That distinction is what my regex got wrong. 2.1.251 assembles its describe text
as a template literal concatenated with a conditional call, something like
`` `...` + (Fs() ? ... : ...) ``, so anything that searches the chain for a call
finds `Fs()` and offers to patch it. The regex had the same flaw in a form I
couldn't see.

The replacement symbol comes from a sibling rule that finds a neighbouring
field whose receiver is already a plain string, then pads it out with a block
comment to the original byte length.

```
| Version | enum | string | derived replacement    |
|---------|------|--------|------------------------|
| 2.1.241 | Dr   | H      | H()/* + 30sp + */      |
| 2.1.251 | ie   | i      | i()/* + 30sp + */      |
```

Both rows come from the same recipe with nothing version-specific in it, so
re-patching after an update is one command. Anything a build step is
contractually unable to rewrite works as an anchor: user-facing strings, error
messages, protocol constants, and embedded docs.

`ast-grep-py` reports character offsets where the ast-grep CLI reports byte
offsets, so any non-ASCII earlier in the blob moves the real splice address and
the conversion gets computed every time. And ast-grep's own `--update-all` will
apply a replacement of the wrong length and shift the file underneath you
silently. I measured -34 bytes. The equal-length check lives in my own splice,
which refuses instead.

## The patch that changed nothing

Then I applied the same recipe to 2.1.251 and it derived the site perfectly,
spliced 37 bytes, reported success — and the enum rejected the model exactly as
before. The error was byte-identical to the unpatched binary's.

Bun runs a module's precompiled bytecode in preference to its source. The
splice was landing on a copy of the code that never executes. Everything I had
built to prove the patch was correct — byte-identical output, the literal gone,
a clean `applied` — measured the file and never once asked the program.

The fix is two more words, both fixed-width, so nothing moves:

```
module record's bytecode (offset, length)  ->  (0, 0)
module's word in the source-hash array     ->  0
```

Zero those and Bun recompiles that module from the patched source. On 2.1.251
that retires 11.8MB of bytecode; on 2.1.241, 215MB, because back then one module
carried it all. The orphaned payload stays where it is — reclaiming it would
mean relocating every payload after it and re-pointing the record chain, and
dead bytes cost nothing while a moved offset costs everything.

Finding those two words meant reading the container: an 8-byte size prefix, an
arena of payloads, a module table of 52-byte records, a source-hash array, and
an offsets struct whose first word is its own position, which is the only reason
it can be found without guessing the trailer's length.

The tool now has a `verify` command that runs the binary and reads which wall it
hits — the enum, or the network. It exists because I shipped a patch that a
whole test suite called correct and that did nothing at all.

## The frontmatter has no enum at all

While hunting for the enum I found the agent-definition frontmatter schema:

```js
model: uu().optional().describe("Model override for this agent. ...")
```

`uu()` is a plain string with no enum around it, so a named subagent in
`.claude/agents/*.md` takes any model id you put there on a stock, unpatched
binary — and sends it to the API verbatim. Point one at a model nothing serves
and it fails honestly: an `unrecognized_model` log line, then `model_not_found`,
HTTP 404, surfaced as an agent-level error. The agent never starts. There is no
silent substitution and no fallback to your default.

`--model` on the session isn't enum-gated either. So the enum guards exactly one
door: the inline `model` argument on an Agent tool call. That happens to be the
door I wanted, because I want Opus to pick the model per call rather than commit
a session to it.

## There's no OpenAI client in the binary

Past validation, the model id reaches an API layer that only knows one
protocol. There's no `chat/completions` string anywhere in the binary, and
every transport it ships (first-party, Bedrock, Vertex, Mantle) speaks the
Anthropic Messages API. `ANTHROPIC_BASE_URL` changes the host it talks to, not
the format it talks in.

So a local llama.cpp server needs a translator in front of it. The proxy
accepts `/v1/messages`, converts the request to `/v1/chat/completions`, and
converts the response back. It handles system blocks, maps `tool_use` and
`tool_result` blocks onto OpenAI's `tool_calls` and `role: "tool"`, carries
tool schemas and `tool_choice` across, and reproduces the streaming SSE shape,
which runs `message_start` → `content_block_start` → deltas → `message_delta` →
`message_stop` and streams tool arguments as `input_json_delta`.

Anything it doesn't recognise as local goes upstream byte-for-byte with its
headers intact, so the rest of the session carries on as normal.

The first real bug was the reasoning model. `llama-server` emits
`reasoning_content` deltas rather than `content`, and my translator silently
dropped them, which produced a technically valid stream with zero content
blocks. Anthropic never returns an empty `content` array and clients assume at
least one block.

## Finding the servers

Local model servers get ephemeral ports. Mine moved from 53495 to 49587 between
two test runs and came back serving a different model. Hardcoding a port is a
losing game, so the proxy discovers them: it uses `lsof` to find loopback
listeners, sends `GET /v1/models` to each plausible one, and treats anything
that answers with a model list as routable.

```
$ bunk backends
http://127.0.0.1:12434/v1  [com.docke]  (none advertised)
http://127.0.0.1:49587/v1  [llama-ser]  unsloth/Qwen3.8-27B-GGUF
```

It only probes commands that look like model servers, which is a list of about
a dozen names by now, plus a handful of well-known ports for the ones whose
process name gives nothing away: vLLM is `python`, LM Studio is `node`. Poking
every listener on a dev machine is rude.

When more than one server is up, the requested model id picks the backend. It
tries an exact match first, then the same id with a `:TAG` suffix stripped,
then a case-insensitive substring match.

## The single-backend fallback

The proxy used to have a fallback: if only one backend is running, send the
request there regardless of the model name. `llama-server` ignores the model
field entirely, so it works.

Then I asked for `nonexistent/Model-9000` and got a cheerful, correct-looking
response. Every field in the reply says `nonexistent/Model-9000`, because the
proxy echoes back what you asked for. Typo a model name in a config and you'd
get plausible output from the wrong model, indefinitely, with nothing in any
log to suggest otherwise.

I'd collapsed two cases that aren't the same. A server that advertises no model
names is genuinely unroutable and can only be guessed at. A server that
advertises names and doesn't have yours is a miss, and should say so:

```json
{"type":"error","error":{"type":"not_found_error",
 "message":"no local backend serves 'nonexistent/Model-9000'. discovered: ['unsloth/Qwen3.8-27B-GGUF']"}}
```

The guess now only survives for the case that motivated it, a lone anonymous
server, and never where the system has enough information to know better. A
fallback that fires when you have evidence against it is how you ship silent
corruption.

## What I ended up with

`bunk sync` applies the patch, `bunk serve` runs the proxy, and `bunk backends`
lists what it found. It started as one PEP 723 script and didn't stay one. The
matching, the Mach-O handling, the translator, and the routing rules are separate
modules now, with an import graph the build enforces, which exists mostly so the
pure parts stay pure. What that buys is a test suite that exercises the matching
strategy against short JavaScript snippets instead of a 200MB binary.

The first thing I actually routed never reached the model: `llama-server` was
running with `-c 4096 --parallel 4`, about 1k tokens per slot, and Claude Code's
system prompt alone is tens of thousands. Restarted with a real context, a
subagent ran on Qwen and came back — 6,372 tokens, thirty seconds, one word.

Which is where the interesting question starts rather than ends. I still haven't
had Opus or Fable delegate a real implementation task to it and watched what
came back, or worked out where between Sonnet and Haiku it actually sits. That's
the next post. The protocol translation was never the hard part.

Code: [github.com/bruk-io/bunk](https://github.com/bruk-io/bunk)
