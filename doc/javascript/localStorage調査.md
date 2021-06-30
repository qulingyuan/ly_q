

| localStorageの項目           | 利用している機能・画面                                       | 適切な情報の持ち方 |
| ---------------------------- | ------------------------------------------------------------ | ------------------ |
| LOGIN_ID                     | 個人設定画面／ユーザ編集画面/コラボレーター編集画面/ユーザーアカウント情報画面/CSV連携画面で本人かどうか判断する | sessionStorage     |
| MOBILE                       | ない                                                         | ない               |
| MOBILE_QR_URL                | モバイルアクセス画面でQRリンクを表示する                     | sessionStorage     |
| MOBILE_ID                    | モバイルアクセス画面でQRリンクを表示する                     | sessionStorage     |
| MULTILANG                    | ユーザ・コラボレーター・ユーザへのお知らせ・プロジェクト・組織・個人設定画面で多言語かどうかを判断する | sessionStorage     |
| OPTIONTOKEN_ENABLED          | トークン登録画面/トークン表示画面/システム画面でオプショントークンオンかどうか判断する | sessionStorage     |
| BINDERTOKEN_ENABLED          | サイドメニュー/システム画面でバインダトークンオンかどうか判断する | sessionStorage     |
| COLLABORATORS_ENABLE         | サイドメニュー/初期化パスワード/シークレットを削除画面/セキュリティ画面でコラボレーターオンかどうか判断する | sessionStorage     |
| IS_COLLABORATOR              | パスワード設定画面/個人設定画面/セキュリティ画面でコラボレーターかどうか判断する | sessionStorage     |
| LOCALE                       | パスワード忘れる画面/ログイン画面/ユーザーアカウント情報画面(グローバル)でローカル言語を判断する | sessionStorage     |
| GEORESTRICT                  | IPアドレス制限画面で地域コードが変更可能かを判断する         | sessionStorage     |
| TWO_STEP_ENABLED             | サイドメニュー/パスワード設定画面/セキュリティ画面で二要素認証オンかどうか判断する | Redux              |
| AuthMethod                   | ログイン画面/ログアウト画面/Saml画面でログイン方法を判断する | Redux--            |
| COLLABORATOR_TWO_STEP_METHOD | サイドメニュー/シークレットを削除画面/セキュリティ画面でコラボレーター二要素認証方法を判断する | Redux              |
| USER_TWO_STEP_METHOD         | サイドメニュー/シークレットを削除画面/セキュリティ画面でユーザー二要素認証方法を判断する | Redux              |
| uuid                         | グローバルロジック                                           | sessionStorage     |
| BAAS_ADMIN                   | ない                                                         | ない               |
| TWO_STEP_METHOD              | セキュリティ画面/パスワード設定画面で二要素認証方法を判断する | Redux              |
| msalTokenRedirect            | ログインロジック                                             | sessionStorage     |
| CSV_PREVIEW                  | ユーザ・ユーザへのお知らせ・プロジェクト・組織・トップコラム・CSV連携でプレビューモデルオンかどうか判断する | Redux              |
| targetUrl                    | SAMLログイン方式のジャンプリンクを確認する                   | Redux              |
|                              |                                                              |                    |

