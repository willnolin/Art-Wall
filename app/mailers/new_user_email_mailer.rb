class NewUserEmailMailer < ApplicationMailer
  default from: ENV['GMAIL_USERNAME']
  def notify_user(user)
    @user = user
    mail(to: @user.email, subject: 'Welcome to Art Wall')
  end
end
