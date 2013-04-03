require 'httparty'

module RedmineSquall
  module IssuePatch
    def self.included(base)
      base.send(:include, InstanceMethods)

      base.class_eval do
        unloadable
        after_update :notificate_to_squall
      end
    end
  end

  module InstanceMethods
    def notificate_to_squall
      body = { title: project.name,
               author: User.current.lastname+" さん",
               issue_id: self.id,
               ids: project.members.map(&:user_id) - [User.current.id] }
      url = "http://localhost:8081/guests/1/messages"
      HTTParty.post(url, body: body)
    end
  end
end
