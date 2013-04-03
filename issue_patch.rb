require 'httparty'

module RedmineSquall
  module IssuePatch
    def self.included(base)
      base.send(:include, InstanceMethods)

      base.class_eval do
        unloadable
        after_save :notificate_to_squall
      end
    end
  end

  module InstanceMethods
    def notificate_to_squall
      puts self
    end
  end
end
