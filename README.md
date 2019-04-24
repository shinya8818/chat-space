
## membersテーブル

|Column|Type|Option|
|------|----|------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group


## messegesテーブル

|Column|Type|Option|
|------|----|------|
|body  |text|null: false|
|image |string|----|
|user_id|integer|null: false, foreign_key: ture|
|group_id|integer|foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group

### インデックス
" add_index:messeges, :body"


## usersテーブル
|column|Type|Option|
|------|----|------|
|name  |string|null: false|
|email |string|null: false, unique: true|
|password|string|null false|

### Association
- has_many :messeges
- has_many :groups, through: :members

### インデックス
" add_index:users, :name"


## groupsテーブル
|column|Type|Option|
|------|----|------|
|user_id|integer|null: false, foreign_key: true|
|group_name|string|null: false|

### Association
- has_many :users, through: :members
- has_many :messeges
