#!/bin/bash

# Configuration
BASE_URL="http://127.0.0.1:3042"
MAX_PRODUCT_ID=15
PAUSE_MIN=0.1
PAUSE_MAX=0.5
RUN_TIME=300  # Default run time in seconds (5 minutes)
VERBOSITY=1   # 0=quiet, 1=basic, 2=detailed

# Process command line arguments
while getopts "u:t:v:h" opt; do
  case $opt in
    u) BASE_URL="$OPTARG" ;;
    t) RUN_TIME="$OPTARG" ;;
    v) VERBOSITY="$OPTARG" ;;
    h)
      echo "Usage: $0 [-u BASE_URL] [-t RUNTIME_SECONDS] [-v VERBOSITY_LEVEL]"
      echo "  -u: Base URL (default: http://127.0.0.1:3042)"
      echo "  -t: Run time in seconds (default: 300)"
      echo "  -v: Verbosity level (0=quiet, 1=basic, 2=detailed) (default: 1)"
      exit 0
      ;;
    \?) echo "Invalid option: -$OPTARG" >&2; exit 1 ;;
  esac
done

# Print script configuration
if [ $VERBOSITY -gt 0 ]; then
  echo "🚀 Traffic simulation started"
  echo "📡 Target: $BASE_URL"
  echo "⏱️  Runtime: $RUN_TIME seconds"
  echo "------------------------------------------------"
fi

# Function to generate random pause duration
random_pause() {
  awk -v min="$PAUSE_MIN" -v max="$PAUSE_MAX" 'BEGIN{srand(); print min+rand()*(max-min)}'
}

# Function to log requests
log_request() {
  local method=$1
  local endpoint=$2
  local status=$3
  
  if [ $VERBOSITY -eq 0 ]; then
    return
  elif [ $VERBOSITY -eq 1 ]; then
    echo "$method $endpoint - $status"
  else
    echo "$(date +"%H:%M:%S") | $method $endpoint - $status"
  fi
}

# Function to make a GET request
make_get_request() {
  local endpoint=$1
  local response=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL$endpoint")
  log_request "GET" "$endpoint" "$response"
  sleep $(random_pause)
}

# Set end time
END_TIME=$(($(date +%s) + RUN_TIME))

# Main traffic simulation loop
product_id=1
while [ $(date +%s) -lt $END_TIME ]; do
  # Simulate different request patterns
  
  random_id=$((RANDOM % MAX_PRODUCT_ID + 1))
  make_get_request "/products/$random_id"
  make_get_request "/products"
  
  # Simulate a small pause between request bursts
  if [ $((RANDOM % 10)) -eq 0 ]; then
    if [ $VERBOSITY -gt 0 ]; then
      echo "Pausing for user think time..."
    fi
    sleep $((RANDOM % 5 + 1))
  fi
done

if [ $VERBOSITY -gt 0 ]; then
  echo "------------------------------------------------"
  echo "✅ Traffic simulation completed"
fi
