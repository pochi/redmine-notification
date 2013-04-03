require 'redmine'
require 'pry'
require 'pry-debugger'

::Rails.logger.info 'Starting Squall Notification Plugin...'

require 'redmine_squall'

ActionDispatch::Callbacks.to_prepare do
  require_dependency 'issue'

  unless Issue.included_modules.include? RedmineSquall::IssuePatch
    Issue.send(:include, RedmineSquall::IssuePatch)
  end
end

Redmine::Plugin.register :squall_notification do
  name 'Squall Notification plugin'
  author 'Yuichi Kuroda'
  description 'Notification FireFox instead of EMail.'
  version '0.0.1'

  requires_redmine :version_or_higher => '2.0.0'

  url 'http://example.com/path/to/plugin'
  author_url 'http://example.com/about'
end
