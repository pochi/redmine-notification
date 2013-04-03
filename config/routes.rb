# Plugin's routes
# See: http://guides.rubyonrails.org/routing.html

get 'squall', :to => 'squall_notificaion#index'
get 'squall/notification', :to => 'squall_notificaion#notification'
