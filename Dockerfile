# Use the official Node.js image as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy the application files into the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application files into the working directory
COPY . .

# Define the entry point for the container
CMD ["node", "src/main.js"]

# Expose port 3000 to the outside world
EXPOSE 3000
