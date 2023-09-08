pipeline {
    agent any

    environment {
        // Set the NVM_DIR environment variable
        NVM_DIR = '/var/lib/jenkins/.nvm'
    }

    stages {
        stage('Install Node.js and npm') {
            steps {
                script {
                    // Install Node.js and npm on Amazon Linux 2 using the updated link
                    sh 'curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash'
                    sh 'export NVM_DIR="$HOME/.nvm"'
                    sh '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"'
                    sh 'nvm install 14'  // Install Node.js version 14
                    sh 'nvm use 14'
                    sh 'npm -v'          // Verify npm installation
                    sh 'node -v'         // Verify Node.js installation
                }
            }
        }

        stage('Build') {
            steps {
                // Install dependencies and build the React app in the root directory
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                // Copy the built files to /home/ec2-user/amazon on your AWS instance using SSH
                script {
                    sshagent(credentials: ['keyPair.pem']) {
                        // Use the 'IP' credential for the EC2 instance's IP address
                        sh 'scp -i keyPair.pem -r ./build ec2-user@' + credentials('IP') + ':/home/ec2-user/amazon'
                    }
                }
            }
        }
    }
}
