provider "aws" {
  region = "us-east-1"   # <-- Important! Must match your S3 bucket region
}

module "vpc" {
  source = "../../modules/vpc"

  vpc_cidr = "10.0.0.0/16"
  public_subnets = ["10.0.1.0/24", "10.0.2.0/24"]
  private_subnets = ["10.0.3.0/24", "10.0.4.0/24"]
  azs = ["us-east-1a", "us-east-1b"]
}

module "eks" {
  source          = "../../modules/eks"
  cluster_name    = "dev-eks-cluster"
  vpc_id          = module.vpc.vpc_id
  private_subnets = module.vpc.private_subnets
  public_subnets  = module.vpc.public_subnets
  region          = "us-east-1"
}

module "rds" {
  source = "../../modules/rds"

  vpc_id             = module.vpc.vpc_id
  private_subnet_ids = module.vpc.private_subnets
  db_password        = var.db_password
}