# CloudDeploy - Automated Deployment System

A comprehensive cloud-native CI/CD dashboard that provides real-time monitoring and control of deployment pipelines using Jenkins, Docker, and AWS EC2.

## 🚀 Features

### Core Functionality
- **Real-time Pipeline Monitoring** - Live status updates for all deployment stages
- **Interactive Dashboard** - Professional web interface with dark/light themes
- **Build History** - Complete deployment history with detailed logs
- **System Metrics** - Resource monitoring and performance tracking
- **Service Integration** - GitHub, Docker, AWS EC2, and Slack connectivity
- **Live Logs** - Real-time deployment log streaming

### Pipeline Stages
1. **Source** - Automatic code pull from GitHub repositories
2. **Build** - Docker containerization and image creation
3. **Deploy** - Automated deployment to AWS EC2 instances
4. **Notify** - Slack integration for build status notifications

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Jenkins, Docker, AWS EC2
- **Notifications**: Slack Webhooks
- **Monitoring**: System metrics and resource tracking

## 📋 Prerequisites

Before setting up the complete CI/CD pipeline, ensure you have:

1. **AWS Account** with EC2 access
2. **GitHub Repository** with your application code
3. **Slack Workspace** for notifications
4. **Docker Hub Account** (optional, for container registry)

## 🏗️ Architecture Overview

```
GitHub Repo → Jenkins → Docker Build → AWS EC2 → Slack Notification
     ↓            ↓           ↓            ↓            ↓
   Source      Build       Deploy      Monitor     Notify
```

## 🚀 Quick Start

### Local Development

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd cloud-deployment-dashboard
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Access Dashboard**
   Open http://localhost:5173 in your browser

### Production Setup

#### 1. AWS EC2 Setup

```bash
# Launch Ubuntu EC2 instance and connect via SSH

# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker ubuntu

# Install Jenkins
wget -q -O - https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo apt-key add -
sudo sh -c 'echo deb https://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
sudo apt update
sudo apt install openjdk-11-jdk jenkins -y
sudo systemctl start jenkins
sudo systemctl enable jenkins
```

#### 2. Jenkins Configuration

1. **Access Jenkins**: `http://your-ec2-ip:8080`
2. **Install Plugins**: Git, Docker, Pipeline, Slack Notification
3. **Configure Credentials**: GitHub token, AWS keys, Slack webhook
4. **Create Pipeline Job** with the following Jenkinsfile:

```groovy
pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = "your-app-name"
        SLACK_CHANNEL = "#deployments"
    }
    
    stages {
        stage('Source') {
            steps {
                git branch: 'main', url: 'https://github.com/your-username/your-repo.git'
                slackSend channel: env.SLACK_CHANNEL, message: "🔄 Starting deployment for ${env.JOB_NAME} #${env.BUILD_NUMBER}"
            }
        }
        
        stage('Build') {
            steps {
                script {
                    docker.build("${env.DOCKER_IMAGE}:${env.BUILD_NUMBER}")
                    docker.build("${env.DOCKER_IMAGE}:latest")
                }
            }
        }
        
        stage('Deploy') {
            steps {
                sh '''
                    docker stop ${DOCKER_IMAGE} || true
                    docker rm ${DOCKER_IMAGE} || true
                    docker run -d -p 80:3000 --name ${DOCKER_IMAGE} ${DOCKER_IMAGE}:latest
                '''
            }
        }
        
        stage('Notify') {
            steps {
                slackSend channel: env.SLACK_CHANNEL, 
                         color: 'good',
                         message: "✅ Deployment successful! ${env.JOB_NAME} #${env.BUILD_NUMBER} is now live."
            }
        }
    }
    
    post {
        failure {
            slackSend channel: env.SLACK_CHANNEL,
                     color: 'danger', 
                     message: "❌ Deployment failed for ${env.JOB_NAME} #${env.BUILD_NUMBER}"
        }
    }
}
```

#### 3. Slack Integration

1. **Create Slack App**: https://api.slack.com/apps
2. **Enable Incoming Webhooks**
3. **Add Webhook URL to Jenkins**
4. **Configure Channel**: Create #deployments channel

#### 4. GitHub Webhook

1. **Repository Settings** → Webhooks
2. **Add Webhook**: `http://your-ec2-ip:8080/github-webhook/`
3. **Content Type**: application/json
4. **Events**: Push events

## 📊 Dashboard Features

### Pipeline Status
- Visual representation of all pipeline stages
- Real-time status updates with color coding
- One-click deployment controls

### System Metrics
- CPU, Memory, Storage, and Network monitoring
- Container status tracking
- System uptime statistics

### Deployment History
- Complete build history with timestamps
- Commit information and author details
- Success/failure status with duration

### Live Logs
- Real-time log streaming
- Expandable log viewer
- Download logs functionality

## 🎨 UI/UX Features

- **Dark/Light Theme Toggle**
- **Responsive Design** - Works on all devices
- **Real-time Updates** - Live status monitoring
- **Interactive Controls** - Deploy, stop, rollback actions
- **Professional Styling** - Modern, clean interface
- **Micro-interactions** - Smooth animations and transitions

## 🔧 Configuration

### Environment Variables

Create `.env` file for local development:

```env
VITE_JENKINS_URL=http://your-jenkins-url:8080
VITE_SLACK_WEBHOOK=your-slack-webhook-url
VITE_AWS_REGION=us-east-1
```

### Docker Configuration

Sample `Dockerfile` for your application:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to AWS EC2

```bash
# Copy build files to EC2
scp -r dist/ ubuntu@your-ec2-ip:/var/www/html/

# Configure Nginx (optional)
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx
```

## 📈 Monitoring & Alerts

### System Monitoring
- Resource usage tracking
- Container health checks
- Deployment success/failure rates

### Alerts Configuration
- Slack notifications for all deployments
- Email alerts for failures (configurable)
- Webhook integration for custom notifications

## 🔒 Security Considerations

- **Access Control**: Jenkins role-based permissions
- **Secure Credentials**: Use Jenkins credential store
- **Network Security**: Configure security groups properly
- **Container Security**: Regular image updates and scans

## 🛠️ Troubleshooting

### Common Issues

1. **Jenkins Access Issues**
   ```bash
   sudo cat /var/lib/jenkins/secrets/initialAdminPassword
   ```

2. **Docker Permission Errors**
   ```bash
   sudo usermod -aG docker jenkins
   sudo systemctl restart jenkins
   ```

3. **Port Access Issues**
   - Check AWS Security Groups
   - Verify firewall settings
   - Confirm service status

## 🚀 Future Enhancements

### Planned Features
- **Kubernetes Integration** - Container orchestration
- **Prometheus + Grafana** - Advanced monitoring
- **Multi-environment Support** - Dev, staging, production
- **Auto-scaling** - Dynamic resource management
- **Security Scanning** - Vulnerability assessment
- **Performance Metrics** - Application performance monitoring

### Monitoring Stack
- **Prometheus** - Metrics collection
- **Grafana** - Visualization dashboards
- **AlertManager** - Alert routing and management

## 📚 Resources

- [Jenkins Documentation](https://www.jenkins.io/doc/)
- [Docker Documentation](https://docs.docker.com/)
- [AWS EC2 Guide](https://docs.aws.amazon.com/ec2/)
- [Slack API Documentation](https://api.slack.com/)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the troubleshooting guide
- Review the documentation

---

**CloudDeploy** - Streamlining deployment pipelines for modern web applications.