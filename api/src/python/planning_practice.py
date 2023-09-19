from datetime import datetime, timedelta
import json
import os

# Absolute path of the script directory
script_dir= os.path.dirname(os.path.abspath(__file__))

# Relative path of the output file
output_path =  os.path.join(script_dir, "..", "data" ,"planning_practices.json")

# Absolute path of the output file
output_path = os.path.normpath(output_path)


# Date de début
start_date = datetime(2023, 9, 4, 18, 0) # mettre au premier jour de la saison, ici un lundi à 18h
# l'idéal est de ne pas modifier l'heure lorsque l'on modifie directement cette variable, c'est plus simple de l'utiliser comme repère

# Date de fin
end_date = datetime(2024, 6, 30, 23, 59) # date de la fin de saison

# Liste des événements
events = []

while start_date <= end_date:
    for i in range(2) :
        # Ajoutez un événement le lundi, 2 fois d'affilée
        events.append({
            "groupId": "WeeklyPractice",
            "title": "Entraînement",
            "start": start_date.strftime('%Y-%m-%dT%H:%M:%S'),
            "end": (start_date + timedelta(hours=2, minutes=30)).strftime('%Y-%m-%dT%H:%M:%S')
        })
        # Passez au prochain lundi
        start_date += timedelta(days=7)

    # Ajoutez un événement le vendredi
    start_date += timedelta(days=4)
    events.append({
        "groupId": "WeeklyPractice",
        "title": "Entraînement",
        # on retire 1h30 à start date car l'entraînement du vendredi commence à 16h30 au lieu de 18h
        "start": (start_date - timedelta(hours=1, minutes=30)).strftime('%Y-%m-%dT%H:%M:%S'),
        # on utilise start date car l'entraînement du vendredi finit à 18h00
        "end": (start_date).strftime('%Y-%m-%dT%H:%M:%S')
    })

    # Passez au prochain lundi
    start_date += timedelta(days=3)

# Enregistrez la liste dans un JSON
with open(output_path, "w") as json_file:
    json.dump(events, json_file, indent=4)

# Affichez le JSON
print(f"Entraînements enregistrés dans {output_path}")
