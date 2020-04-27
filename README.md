# Chat-space DB設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|username|string|null: false|
### Association
- has_many :comments
- has_many :users_groups
- has_many :groups, through:  :users_groups

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|groupname|string|null: false|
### Association
- has_many :comments
- has_many :users_groups
- has_many  :users,  through:  :users_groups

## users_groupsテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group

## commentsテーブル
|Column|Type|Options|
|------|----|-------|
|text|text|null: false|
|image|string|null: false|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user