---
name: game-state-rules-grounded-play
description: Play or referee a board game, chess or a family tabletop role-playing session with the model as opponent, rules lookup or game master by keeping an explicit state block (position or resources, whose turn, history) that is rebuilt from the move list and re-printed after every move, rejecting any move that is not legal from that state with the rule or line cited, answering rules questions only from the pasted rulebook text and edition, and ending a role-playing session with a resume note. Use when a user wants to play chess or a board game against the model, asks what a rule says, or runs a family tabletop session and the model keeps losing the board, inventing moves or mixing editions. Not for generating puzzles, teaching strategy or choosing which game to buy.
metadata:
  tier: open
  level: L3
  domain: home-hobbies
  install: optional
  keywords: [chess, board game, rules lookup, game master, tabletop RPG, game state, legal move]
  verified-runtimes: [claude-code]
---

# Game state and rules grounded play

Players who use a model as opponent report illegal moves, pieces that appear or vanish, a
return to an earlier position, expansion rules mixed into the base game, and a family
campaign whose state has to be retold every session. The model plays well only when the state
and the rules are written down and checked, not remembered.

For chess, read `references/chess-state-block.md` before the first reply.

## Steps

1. State block first. Before the first reply, rebuild the current state from what the user
   gave (a move list, a rulebook page, a character sheet) and print it: for chess the board
   with every piece by square, castling and en passant rights, side to move and the move
   number; for a board game each player's resources, board items and whose turn it is; for a
   role-playing session characters, positions, resources and open threads. If the input
   cannot be rebuilt unambiguously, say so and ask instead of guessing. Rebuild by replay,
   never from memory of the opening: start from the standard setup, apply the moves one at a
   time and write each move as "piece from-square to-square, captured X". Then audit the
   result before printing it: count pieces per side (16 minus what was captured), pawns per
   file, one king each, and every square a move touched. A pawn or piece that no move
   touched must still be on its starting square.
2. For every move the user makes, check it against the state before accepting it. Name the
   piece, the squares and the rule: how the piece moves, that the path is clear, what is
   captured, whether the mover's own king ends in check. A move that is not legal from this
   state is refused with that reason, the unchanged state is printed again with the side to
   move, and the user is asked in so many words to play a different move. Listing the legal
   moves helps but does not replace that request. Never repair an illegal move silently.
3. For every move you judge, the user's and your own, verify it the same way, then say what
   it does: what it captures, whether it gives check, and which enemy pieces it attacks
   afterwards (a knight move that attacks the queen says so). Re-print the full state block after every move pair, with the side to move.
4. Facts about the position come before opinion. Legality, attacked pieces and check are
   facts you derive from the state; whether a move is good, who is better or how balanced a
   rule is are opinions, labelled as opinion and kept in a separate line. Before saying who
   is ahead, add up the material from your audit and show the count; an opinion that
   contradicts the count is an error.
5. Rules questions: answer only from the rulebook text the user pasted. Quote the passage,
   name the game, edition and any expansion, and refuse to import a rule from another edition
   or expansion that is not in the text. If the text is silent or ambiguous, say unresolved
   and offer the readings for the table to agree on, or the official errata if the user has
   it.
6. Role-playing sessions: record dice results and resource changes exactly as the players
   report them, never overrule a player's choice or roll, keep established facts, and end
   the session with a resume note: state, open threads, what each character wants next.

## Output

Stay inside this contract: every extra remark is one more claim that can be wrong, so
leave out side commentary and state a legality reason only in terms of the squares, the
path and the king's safety.

The state block, the legality check with its rule for each move, the reply move or the
refusal, opinions on a separate line, and for a session the resume note.
