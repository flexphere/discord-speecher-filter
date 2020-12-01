FROM debian:stable-slim

# env
ENV DENO_INSTALL /usr/local/deno
ENV PATH=$DENO_INSTALL/bin:$PATH

# install dependencies
RUN apt update
RUN apt install -y curl unzip

# install deno
RUN curl -fsSL https://deno.land/x/install/install.sh | sh

# set workspace
WORKDIR /workspace

# copy sources
COPY . .

# CMD ["deno", "run", "--allow-net", "src/index.ts"]

