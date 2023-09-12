# Use an official Node.js runtime as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app source code to the container
COPY . .

# Build the React app (replace with your build command if different)
RUN npm run build

# Expose port 9090 inside the container
EXPOSE 9090

# Define the command to start your app (replace with your start command if different)
CMD ["npm", "start"]
