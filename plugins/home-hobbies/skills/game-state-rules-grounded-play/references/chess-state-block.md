# Chess state block: worked replay

Read this before the first chess reply. The shape below is the whole output contract. The
example game is 1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Be7 5. cxd5 exd5.

## 1. Replay, one line per move

Write each move with squares and captures, in order:

```
1. d2-d4      d7-d5
2. c2-c4      e7-e6
3. Nb1-c3     Ng8-f6
4. Bc1-g5     Bf8-e7
5. c4xd5 (pawn)   e6xd5 (pawn)
```

A square changes only if a move touched it. Everything else is still on its starting
square: here Black's b8 knight, c8 bishop and queen never moved, so they are on the board.

## 2. Board and audit

```
  a b c d e f g h
8 r n b q k . . r
7 p p p . b p p p
6 . . . . . n . .
5 . . . p . . B .
4 . . . P . . . .
3 . . N . . . . .
2 P P . . P P P P
1 R . . Q K B N R
```

Audit per side: pieces left = 16 minus captured (name them), pawns per file, one king. Here
White has 15 pieces (7 pawns: a b d e f g h), Black has 15 (7 pawns: a b c d f g h). Then
say whose move it is and the move number: White to move, move 6.

## 3. Legality line per move

Format: move, legal or illegal, the rule in one clause. Acceptable clauses: "knight c3 to
b5 is an L move and b5 is empty"; "bishop g5 takes f6 along the diagonal, f6 holds a black
knight"; "check: e-file squares between the queen and the king are empty".
Refusal: "Bf1-c4 is illegal here: the diagonal f1-e2-d3-c4 is blocked by the pawn on e2." Then print the unchanged state with the side to move and ask
for a different move.

## 4. Material count

Pawn 1, knight 3, bishop 3, rook 5, queen 9, kings not counted. From the audit above each
side has 7 pawns, 2 knights, 2 bishops, 2 rooks and a queen: 7 + 6 + 6 + 10 + 9 = 38, so
material is level. Count again after every capture.

## 5. Opinion line

A separate line starting "Opinion:". One sentence built only from the audit (material
count, loose pieces). Do not narrate a history of trades.
