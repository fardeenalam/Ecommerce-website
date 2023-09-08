
// Run these commands on terminal to install nodeJS otherwise Build Stage will be failed

// # Install nvm (Node Version Manager) as the ec2-user
// curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

// # Load nvm
// export NVM_DIR="$HOME/.nvm"
// [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

// # Install Node.js (e.g., version 14)
// nvm install 14

// # Use the installed Node.js version
// nvm use 14

// # Verify npm installation
// npm -v


pipeline {
    agent any

    environment {
        // Reference the NodeJS installation by name
        NODEJS_HOME = tool name: 'NodeJS v20', type: 'Tool'
        PATH = "${NODEJS_HOME}/bin:${PATH}"
    }

    stages {
        stage('Build') {
            steps {
                script {
                    // Use Node.js and npm
                    sh 'node -v'
                    sh 'npm -v'

                    // Install project dependencies
                    sh 'npm install'

                    // Build your project
                    sh 'npm run build'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Copy the built files to /home/ec2-user/amazon on your AWS instance using SSH
                    sshagent(credentials: ['keyPair.pem']) {
                        // Use the 'IP' credential for the EC2 instance's IP address
                        sh 'scp -i keyPair.pem -r ./build ec2-user@' + credentials('IP') + ':/home/ec2-user/amazon'
                    }
                }
            }
        }
    }
}


