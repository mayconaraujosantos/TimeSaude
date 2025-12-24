#!/bin/bash

# Quality Check Script for TimeSaude
# This script runs all quality checks in sequence

set -e  # Exit on any error

echo "🚀 Starting Code Quality Check..."
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored messages
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_section() {
    echo ""
    echo "================================"
    echo "$1"
    echo "================================"
}

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    print_error "node_modules not found. Please run 'pnpm install' first."
    exit 1
fi

# 1. Security Audit
print_section "1. Security Audit"
if pnpm audit --audit-level=moderate; then
    print_success "Security audit passed"
else
    print_warning "Security issues found - review manually"
fi

# 2. Type Checking
print_section "2. TypeScript Type Check"
if pnpm type-check; then
    print_success "Type check passed"
else
    print_error "Type check failed"
    exit 1
fi

# 3. Linting
print_section "3. ESLint"
if pnpm lint; then
    print_success "Linting passed"
else
    print_error "Linting failed"
    exit 1
fi

# 4. Format Check
print_section "4. Prettier Format Check"
if pnpm format:check; then
    print_success "Format check passed"
else
    print_error "Format check failed - run 'pnpm format' to fix"
    exit 1
fi

# 5. Tests with Coverage
print_section "5. Running Tests with Coverage"
if pnpm test:coverage; then
    print_success "All tests passed"
else
    print_error "Tests failed"
    exit 1
fi

# 6. Check for outdated dependencies
print_section "6. Checking Outdated Dependencies"
print_warning "Listing outdated dependencies:"
pnpm outdated || true

# Summary
print_section "✅ Quality Check Complete!"
echo ""
echo "All checks passed successfully! 🎉"
echo ""
echo "Coverage report available at: ./coverage/lcov-report/index.html"
echo ""
