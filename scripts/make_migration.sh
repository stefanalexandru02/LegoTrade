#!/bin/bash

# Set the directory where the migrations are stored
migrations_dir="Data/Migrations"

# Find the latest migration
latest_migration=$(ls $migrations_dir | grep auto_migrate_ | sort -r | head -n 1)

current_number=$(echo $latest_migration | grep -o -E 'auto_migrate_[0-9]+' | sed 's/auto_migrate_//')

# Increment the migration number
next_number=$((current_number + 1))

# Create the new migration
dotnet-ef migrations add auto_migrate_$next_number