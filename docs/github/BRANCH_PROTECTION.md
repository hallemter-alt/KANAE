# GitHub 分支保护规则設定ガイド

## KANAE プロジェクト用

---

## 1. main ブランチ保護（最厳格）

### 設定パス

Repository → Settings → Branches → Add rule

### Branch name pattern

```
main
```

### 保護設定

| 設定項目                                                   | 値                                            | 説明                                    |
| ---------------------------------------------------------- | --------------------------------------------- | --------------------------------------- |
| **Require a pull request before merging**                  | ✅ ON                                         | 直接push禁止                            |
| **Require approvals**                                      | ✅ ON                                         | 必要承認数: 2                           |
| **Dismiss stale PR approvals when new commits are pushed** | ✅ ON                                         | 新コミットで承認無効化                  |
| **Require review from Code Owners**                        | ✅ ON                                         | CODEOWNERS指定者の承認必須              |
| **Require approval of the most recent reviewable push**    | ✅ ON                                         | 最後のpush者以外の承認必須              |
| **Require status checks to pass before merging**           | ✅ ON                                         | CIチェック必須                          |
| **Status checks that are required**                        | `lint-and-typecheck`, `storybook`, `security` | 必須チェック                            |
| **Require branches to be up to date before merging**       | ✅ ON                                         | 最新mainへのrebase必須                  |
| **Require conversation resolution before merging**         | ✅ ON                                         | 未解決コメント禁止                      |
| **Require signed commits**                                 | ✅ ON                                         | GPG署名必須                             |
| **Require linear history**                                 | ✅ ON                                         | マージコミット禁止（rebase/squashのみ） |
| **Require merge queue**                                    | ✅ ON                                         | マージキュー有効化                      |
| **Lock branch**                                            | ❌ OFF                                        | 管理用の緊急修正を許可                  |
| **Do not allow bypassing the above settings**              | ✅ ON                                         | Adminもルール適用                       |
| **Restrict who can push to matching branches**             | ✅ ON                                         | 特定メンバーのみpush許可                |
| **Allow force pushes**                                     | ❌ OFF                                        | force push禁止                          |
| **Allow deletions**                                        | ❌ OFF                                        | ブランチ削除禁止                        |

---

## 2. develop ブランチ保護（中程度）

### Branch name pattern

```
develop
```

### 保護設定

| 設定項目                                  | 値                   | 説明                        |
| ----------------------------------------- | -------------------- | --------------------------- |
| **Require a pull request before merging** | ✅ ON                | 直接push禁止                |
| **Require approvals**                     | ✅ ON                | 必要承認数: 1               |
| **Dismiss stale PR approvals**            | ✅ ON                | 新コミットで承認無効化      |
| **Require status checks to pass**         | ✅ ON                | CIチェック必須              |
| **Status checks that are required**       | `lint-and-typecheck` | 最低限のチェック            |
| **Require branches to be up to date**     | ✅ ON                | 最新developへのrebase必須   |
| **Require linear history**                | ✅ ON                | マージコミット禁止          |
| **Lock branch**                           | ❌ OFF               | 開発用ブランチはロック不要  |
| **Do not allow bypassing**                | ❌ OFF               | Adminはbypass可能（緊急時） |
| **Allow force pushes**                    | ❌ OFF               | force push禁止              |

---

## 3. feature/\* ブランチ（保護なし・推奨設定）

### Branch name pattern

```
feature/*
```

### 保護設定

- 保護なし（自由にpush可能）
- ただし、main/developへのマージはPR必須

---

## 4. release/\* ブランチ保護（リリース用）

### Branch name pattern

```
release/*
```

### 保護設定

- mainと同じ厳格さ
- 承認数: 2
- CODEOWNERS承認必須
- すべてのstatus checks必須

---

## 5. hotfix/\* ブランチ保護（緊急修正用）

### Branch name pattern

```
hotfix/*
```

### 保護設定

- developと同じ中程度の保護
- 承認数: 1（緊急時はAdminがbypass可能）
- lint-and-typecheckのみ必須
