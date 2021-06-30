#### 特徴

|                            | redux/react-redux                                            | localStorage                                                 | sessionStorage                                               |
| -------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 持久化                     | ページの更新ステータスが初期化されます                       | 消えることはありません（ハードディスクに永続的）。           | ページを閉じるデータが消える                                 |
| コンポーネントとの相互作用 | redux / react-reduxはデータを保存するだけでなく、最も重要なことは、状態を変更すると、その状態をリッスンするすべてのコンポーネントが再レンダリングされることです。 | コンポーネントの相互作用なし                                 | コンポーネントの相互作用なし                                 |
| 使用するシーン             | コンポーネントは状態を共有し、データを永続的に保存する必要はありません | データのクロスセッション永続ストレージ、ローカルに保存された長期データに適しています | これは主に、セッション中にのみ有効な1回限りのデータである小さなデータを格納するために使用されます。 |
| 性能                       | 高性能                                                       | 低性能                                                       | 低性能                                                       |
| 結論                       | 値を変更する場合、コンポーネントを変更する原因となるデータが必要です | 永続性が必要でない限り、localStorageを使用する必要はありません | セッションと同様に、パフォーマンスはlocalStorageよりも優れています |



結論として：

永続化する必要がなく、セッション期間にのみ存在するデータは、sessionStorageに配置するのに適しています。
複数の変更が行われ、コンポーネントの変更の原因となったデータがreduxに保存されている場合。
永続化する必要のあるデータはlocalStorageに配置されます。



#### Redux

TWO_STEP_ENABLED

AuthMethod

COLLABORATOR_TWO_STEP_METHOD

uuid

USER_TWO_STEP_METHOD

#### sessionStorage

OPTIONTOKEN_ENABLED

COLLABORATORS_ENABLE

IS_COLLABORATOR

MOBILE_QR_URL

MOBILE_ID

LOCALE

IS_COLLABORATOR

MULTILANG

BINDERTOKEN_ENABLED

GEORESTRICT

#### localStorage

LOGIN_ID

#### ストレージは必要ありません

ADMIN

MOBILE

BAAS_ADMIN



-----

Reduxのデータを永続化したい場合は：

[redux-persist](https://github.com/rt2zz/redux-persist)を利用します。

