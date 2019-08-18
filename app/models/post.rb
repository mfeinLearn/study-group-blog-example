class Post < ApplicationRecord
  belongs_to :user
  has_many :comments, dependent: :destroy
  has_many :post_tags
  has_many :tags, through: :post_tags

  validates :title, :content, presence: true

  def tags_attributes=(tags)
    tags.values.each do |tag|
      tag = Tag.find_or_create_by(name: tag[:name])
      self.tags << tag unless self.tags.include?(tag)
    end
  end

  def next
    # have logic in the post model to grab the next post
    ## where - grab all of the post with the id that are greater then
    ## the post that is calling it
    ## then we will grab the first one of those because that will be the
    ## next post

    # we are white listing the varibles to prevent sql injection
    post = Post.where("id > ?", id).first

    if post
      post
    else
      Post.first
    end
  end
end
