if Rails.env === 'production'
    Rails.application.config.session_store :cookie_store, key: '_front', domain: 'フロントエンドのドメイン'
else
    Rails.application.config.session_store :cookie_store, key: '_front'
end