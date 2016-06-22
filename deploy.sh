#!/bin/bash

args=("$@")
aws s3 cp ./public s3://$args --recursive
