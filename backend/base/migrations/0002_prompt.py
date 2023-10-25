# Generated by Django 4.2.5 on 2023-10-25 20:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Prompt',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('english2creole', models.TextField()),
                ('creole2english', models.TextField()),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]
