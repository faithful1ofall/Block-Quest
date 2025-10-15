;; Block Quest Word Game Contract
;; A Wordle-style word guessing game with STX staking

;; Constants
(define-constant contract-owner tx-sender)
(define-constant err-not-authorized (err u100))
(define-constant err-not-found (err u101))
(define-constant err-already-resolved (err u102))
(define-constant err-already-claimed (err u103))
(define-constant err-not-resolved (err u104))
(define-constant err-nothing-to-claim (err u105))
(define-constant err-invalid-amount (err u106))
(define-constant err-invalid-multiplier (err u107))

;; Data Variables
(define-data-var game-counter uint u0)

;; Data Maps
(define-map games
  { game-id: uint }
  {
    player: principal,
    deposit: uint,
    multiplier: uint,
    claim-amount: uint,
    claimed: bool,
    resolved: bool,
    timestamp: uint
  }
)

;; Removed player-games map for simplicity

;; Read-only functions
(define-read-only (get-game-info (game-id uint))
  (ok (map-get? games { game-id: game-id }))
)

;; Removed get-player-games function

(define-read-only (get-game-counter)
  (ok (var-get game-counter))
)

(define-read-only (get-contract-balance)
  (ok (stx-get-balance (as-contract tx-sender)))
)

;; Public functions

;; Deposit STX and start a new game
(define-public (deposit-and-play (amount uint))
  (let
    (
      (game-id (var-get game-counter))
    )
    ;; Validate amount
    (asserts! (> amount u0) err-invalid-amount)
    
    ;; Transfer STX from player to contract
    (try! (stx-transfer? amount tx-sender (as-contract tx-sender)))
    
    ;; Create new game
    (map-set games 
      { game-id: game-id }
      {
        player: tx-sender,
        deposit: amount,
        multiplier: u0,
        claim-amount: u0,
        claimed: false,
        resolved: false,
        timestamp: block-height
      }
    )
    
    ;; Increment counter
    (var-set game-counter (+ game-id u1))
    
    ;; Return game ID
    (ok game-id)
  )
)

;; Resolve game with multiplier (only contract owner)
(define-public (resolve-game (game-id uint) (multiplier uint))
  (let
    (
      (game (unwrap! (map-get? games { game-id: game-id }) err-not-found))
    )
    ;; Only owner can resolve
    (asserts! (is-eq tx-sender contract-owner) err-not-authorized)
    
    ;; Check not already resolved
    (asserts! (not (get resolved game)) err-already-resolved)
    
    ;; Validate multiplier (0-5)
    (asserts! (<= multiplier u5) err-invalid-multiplier)
    
    ;; Calculate claim amount
    (let
      (
        (claim-amt (* (get deposit game) multiplier))
      )
      ;; Update game
      (map-set games 
        { game-id: game-id }
        (merge game {
          multiplier: multiplier,
          claim-amount: claim-amt,
          resolved: true
        })
      )
      
      (ok true)
    )
  )
)

;; Claim reward after game is resolved
(define-public (claim-reward (game-id uint))
  (let
    (
      (game (unwrap! (map-get? games { game-id: game-id }) err-not-found))
    )
    ;; Only player can claim
    (asserts! (is-eq tx-sender (get player game)) err-not-authorized)
    
    ;; Check game is resolved
    (asserts! (get resolved game) err-not-resolved)
    
    ;; Check not already claimed
    (asserts! (not (get claimed game)) err-already-claimed)
    
    ;; Check there's something to claim
    (asserts! (> (get claim-amount game) u0) err-nothing-to-claim)
    
    ;; Transfer reward to player
    (try! (as-contract (stx-transfer? (get claim-amount game) tx-sender (get player game))))
    
    ;; Mark as claimed
    (map-set games 
      { game-id: game-id }
      (merge game { claimed: true })
    )
    
    (ok true)
  )
)

;; Emergency withdraw (only owner)
(define-public (emergency-withdraw (amount uint))
  (begin
    (asserts! (is-eq tx-sender contract-owner) err-not-authorized)
    (try! (as-contract (stx-transfer? amount tx-sender contract-owner)))
    (ok true)
  )
)

;; Get game statistics
(define-read-only (get-game-stats (game-id uint))
  (let
    (
      (game (unwrap! (map-get? games { game-id: game-id }) err-not-found))
    )
    (ok {
      player: (get player game),
      deposit: (get deposit game),
      multiplier: (get multiplier game),
      potential-win: (get claim-amount game),
      status: (if (get claimed game)
        "claimed"
        (if (get resolved game)
          "resolved"
          "active"
        )
      )
    })
  )
)
