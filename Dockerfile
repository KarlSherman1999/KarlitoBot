bashCopy code
# Use the official Node.js image as the base image
FROM node:16

RUN npm install
# Set the working directory in the container
WORKDIR /app

# Copy the application files into the working directory
COPY package.json

# Install the application dependencies
RUN npm install

# Define the entry point for the container
CMD ["node", "src/main.js"]

EXPOSE 3000
