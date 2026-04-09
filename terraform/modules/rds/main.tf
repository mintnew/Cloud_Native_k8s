resource "aws_db_subnet_group" "rds" {
  name       = "rds-subnet-group"
  subnet_ids = var.private_subnet_ids

  tags = {
    Name = "rds-subnet-group"
  }
}

resource "aws_security_group" "rds" {
  name        = "rds-sg"
  description = "Allow DB access from EKS"
  vpc_id      = var.vpc_id

  ingress {
    description = "Postgres from EKS"
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"

    # 🔥 IMPORTANT: restrict later using EKS SG
    cidr_blocks = ["10.0.0.0/16"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_db_instance" "postgres" {
  identifier              = "ecommerce-db"
  engine                  = "postgres"
  engine_version          = "15"
  instance_class          = "db.t3.micro"
  allocated_storage       = 20

  db_name  = "ecommerce"
  username = "postgres"
  password = var.db_password

  db_subnet_group_name   = aws_db_subnet_group.rds.name
  vpc_security_group_ids = [aws_security_group.rds.id]

  publicly_accessible = false
  skip_final_snapshot = true

  tags = {
    Name = "ecommerce-rds"
  }
}