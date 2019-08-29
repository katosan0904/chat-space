# README
# README

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|body|text|null: false|
|image|string|
|group_id|integer|null :false|
|user_id|integer|null :false|


### Association
- belongs_to :user
- belongs_to :group

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|name|text|null: false|
|user_id|integer|null: false|

### Association
- has_many :groups_users
- has_many :users, through: groups_users
- has_many :messages


## usersテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|name|text|null: false|
|email|string|add_index :users, :email, unique: true|

### Association
- has_many :groups_users
- has_many :groups, through :groups_users
- has many :messages


