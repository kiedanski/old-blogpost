FROM ruby:3.1.1-buster




COPY Gemfile .
RUN bundle 


WORKDIR /workspace

CMD ["/usr/local/bin/bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0"]