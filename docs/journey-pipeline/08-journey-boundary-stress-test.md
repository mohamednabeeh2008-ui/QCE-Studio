# PASS-J08 — Journey Boundary Stress Test

Status: LOCKED
Version: 1.0

## Purpose
Stress-test the five promoted journeys against premature starts, delayed endings, missed re-exposure, and dependency on adjacent arcs.

## Boundary gates

```text
B1 Earliest necessary T0
B2 Latest sufficient T1
B3 No unrelated prehistory imported
B4 No aftermath retained after capacity lock
B5 Re-exposure checked when a commitment is later tested
B6 Adjacent arc dependency explicitly resolved
B7 Boundary changes must preserve identity
```

## Stress-test results

| Journey | Start too early? | End too late? | Re-exposure missing? | Adjacent-arc dependency | Decision |
|---|---|---|---|---|---|
| J-000001 Adam | No | No | Not required for current identity | Distinct adjacent arcs excluded | LOCK |
| J-000002 Noah mission-mode shift | No | No | Not required | Construction is transition closure, not a second journey by default | LOCK |
| J-000003 Noah corrected understanding | No | No | No | Loss context retained only where transition-dependent | LOCK |
| J-000004 Ibrahim peaceful separation | No | No | No | Post-separation gift is aftermath evidence, not identity core | LOCK |
| J-000005 Ibrahim reassurance | No | No | Not required | Event is self-bounded | LOCK |

## Boundary corrections

### J-000001
Do not begin at creation merely because it is earlier. Begin where the identity-bearing disruption becomes necessary to explain reception and return.

### J-000002
Do not begin with the whole life mission of Noah. Begin at the response-horizon closure required to explain the mode shift. Do not extend through every later flood event.

### J-000003
Do not merge the entire flood event. Preserve only the relational expectation, correction, and resulting reorientation required by identity.

### J-000004
The later replacement gift may support the aftermath but does not define the journey boundary. The identity closes when truthful address becomes peaceful separation.

### J-000005
The journey begins from explicit established belief and ends with the enacted reassurance sequence. No invented prehistory of doubt is allowed.

## New governance rule

`BOUNDARY = MINIMUM COMPLETE SPAN THAT PRESERVES THE TRANSITION`

A journey boundary must be neither the smallest verse range nor the largest narrative context. It is the minimum complete formation span.

## Result

```text
JOURNEYS TESTED: 5
BOUNDARIES RETAINED: 5
BOUNDARY SPLITS: 0
BOUNDARY MERGES: 0
PREMATURE STARTS: 0
DELAYED ENDINGS: 0
MISSED RE-EXPOSURE: 0
```

PASS-J08: PASS / LOCKED
