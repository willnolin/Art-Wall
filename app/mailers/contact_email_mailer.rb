class ContactEmailMailer < ApplicationMailer
  def contact_host(user, _data)
    @user = user
    mail(to: @user.email, subject: 'An Artist Wants To Contact You')
  end
end
