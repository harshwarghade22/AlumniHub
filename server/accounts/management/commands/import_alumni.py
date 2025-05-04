import csv
from django.core.management.base import BaseCommand
from accounts.models import Alumni, UserAccount
from django.db import transaction

class Command(BaseCommand):
    help = 'Import alumni data from a CSV file'

    def add_arguments(self, parser):
        parser.add_argument('csv_file', type=str, help='E:\alumni_data.csv')

    def handle(self, *args, **options):
        csv_file_path = options['csv_file']
        
        try:
            with open(csv_file_path, 'r') as file:
                reader = csv.DictReader(file)
                alumni_created = 0
                
                for row in reader:
                    try:
                        with transaction.atomic():
                            # Create a user account first
                            user = UserAccount.objects.create_user(
                                email=row['email'],
                                name=row['name'],
                                password='defaultpassword123'  # You might want to generate this randomly
                            )
                            
                            # Create the alumni profile
                            Alumni.objects.create(
                                user=user,
                                name=row['name'],
                                graduation_year=int(row['graduation_year']),
                                branch=row['branch'],
                                current_designation=row['current_designation'],
                                company=row['company'],
                                skills=row['skills']
                            )
                            alumni_created += 1
                            
                            self.stdout.write(
                                self.style.SUCCESS(f'Successfully created alumni: {row["name"]}')
                            )
                            
                    except Exception as e:
                        self.stdout.write(
                            self.style.ERROR(f'Failed to create alumni {row["name"]}: {str(e)}')
                        )
                        continue
                
                self.stdout.write(
                    self.style.SUCCESS(f'Successfully imported {alumni_created} alumni records')
                )
                
        except FileNotFoundError:
            self.stdout.write(
                self.style.ERROR(f'Could not find CSV file at {csv_file_path}')
            )
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'An error occurred: {str(e)}')
            )