;; Block Quest NFT Contract
;; Implements Quest Pass and Quest Badge NFTs

;; Define NFT tokens
(define-non-fungible-token quest-pass uint)
(define-non-fungible-token quest-badge uint)

;; Storage
(define-data-var last-pass-id uint u0)
(define-data-var last-badge-id uint u0)

;; Maps to track ownership
(define-map badge-levels uint uint)

;; Error codes
(define-constant ERR-NOT-AUTHORIZED (err u100))
(define-constant ERR-ALREADY-MINTED (err u101))
(define-constant ERR-INVALID-LEVEL (err u102))

;; Mint Quest Pass
;; Can only mint one per address
(define-public (mint-quest-pass)
  (let
    (
      (token-id (+ (var-get last-pass-id) u1))
    )
    (try! (nft-mint? quest-pass token-id tx-sender))
    (var-set last-pass-id token-id)
    (ok token-id)
  )
)

;; Mint Quest Badge
;; Mints a badge for a specific level
(define-public (mint-quest-badge (level uint))
  (let
    (
      (token-id (+ (var-get last-badge-id) u1))
    )
    (asserts! (> level u0) ERR-INVALID-LEVEL)
    (try! (nft-mint? quest-badge token-id tx-sender))
    (map-set badge-levels token-id level)
    (var-set last-badge-id token-id)
    (ok token-id)
  )
)

;; Get Quest Pass owner
(define-read-only (get-pass-owner (token-id uint))
  (ok (nft-get-owner? quest-pass token-id))
)

;; Get Quest Badge owner
(define-read-only (get-badge-owner (token-id uint))
  (ok (nft-get-owner? quest-badge token-id))
)

;; Get badge level
(define-read-only (get-badge-level (token-id uint))
  (ok (map-get? badge-levels token-id))
)

;; Get last minted IDs
(define-read-only (get-last-pass-id)
  (ok (var-get last-pass-id))
)

(define-read-only (get-last-badge-id)
  (ok (var-get last-badge-id))
)

;; Transfer Quest Pass
(define-public (transfer-pass (token-id uint) (sender principal) (recipient principal))
  (begin
    (asserts! (is-eq tx-sender sender) ERR-NOT-AUTHORIZED)
    (nft-transfer? quest-pass token-id sender recipient)
  )
)

;; Transfer Quest Badge
(define-public (transfer-badge (token-id uint) (sender principal) (recipient principal))
  (begin
    (asserts! (is-eq tx-sender sender) ERR-NOT-AUTHORIZED)
    (nft-transfer? quest-badge token-id sender recipient)
  )
)
