class Post < ApplicationRecord
  belongs_to :user
  has_many :comments, dependent: :destroy
  has_many :post_tags
  has_many :tags, through: :post_tags

  validates :title, :content, presence: true

  accepts_nested_attributes_for :tags, reject_if: proc { |attributes| attributes['name'].blank? }
end
