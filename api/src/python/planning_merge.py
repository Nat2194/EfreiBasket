import pandas as pd
import os

# Absolute path of the script directory
script_dir= os.path.dirname(os.path.abspath(__file__))

# Relative paths of the planning files
resultats_efrei_path = os.path.join(script_dir, "..", "data","resultats_EFREI.xlsx")
planning_efrei_path = os.path.join(script_dir, "..", "data", "planning_EFREI.xlsx")


resultats_efrei_paris_path = os.path.join(script_dir, "..", "data","resultats_EFREI PARIS.xlsx")
planning_efrei_paris_path = os.path.join(script_dir, "..", "data","planning_EFREI PARIS.xlsx")

# Absolute paths of the planning files
resultats_efrei_path = os.path.normpath(resultats_efrei_path)
planning_efrei_path = os.path.normpath(planning_efrei_path)

resultats_efrei_paris_path = os.path.normpath(resultats_efrei_paris_path)
planning_efrei_paris_path = os.path.normpath(planning_efrei_paris_path)

# Relative path of the output file
output_path =  os.path.join(script_dir, "..", "data" ,"planning.json")

# Absolute path of the output file
output_path = os.path.normpath(output_path)

# Charger les fichiers Excel dans des DataFrames pour "EFREI"
resultats_df_efrei = pd.read_excel(resultats_efrei_path)
planning_df_efrei = pd.read_excel(planning_efrei_path)

# Charger les fichiers Excel dans des DataFrames pour "EFREI PARIS"
resultats_df_efrei_paris = pd.read_excel(resultats_efrei_paris_path)
planning_df_efrei_paris = pd.read_excel(planning_efrei_paris_path)

# Fusionner les deux DataFrames de "EFREI PARIS" en fonction des colonnes communes
merged_df_efrei_paris = pd.merge(resultats_df_efrei_paris, planning_df_efrei_paris, on=['Poule', 'Date', 'Heure', 'Équipe 1', 'Équipe 2'])

# Fusionner les deux DataFrames de "EFREI" en fonction des colonnes communes
merged_df_efrei = pd.merge(resultats_df_efrei, planning_df_efrei, on=['Poule', 'Date', 'Heure', 'Équipe 1', 'Équipe 2'])

# Concaténer les DataFrames de "EFREI" et "EFREI PARIS" pour obtenir un DataFrame unique
final_df = pd.concat([merged_df_efrei, merged_df_efrei_paris], ignore_index=True)

# Trier les matchs par date
final_df['Date'] = pd.to_datetime(final_df['Date'], format='%d/%m/%Y')  # Convertir la colonne 'Date' en format de date
final_df = final_df.sort_values(by='Date')


# Sélectionner les colonnes nécessaires et renommer les colonnes au format souhaité
final_df = final_df[['Poule', 'Date', 'Heure', 'Équipe 1', 'Équipe 2', 'Lieu', 'M. Joué', 'Score 1', 'Score 2', 'Forf. 1', 'Forf. 2']]
final_df.columns = ['Poule', 'Date', 'Heure', 'Équipe 1', 'Équipe 2', 'Lieu', 'MatchJoue', 'Score1', 'Score2', 'Forf1', 'Forf2']

# Réinitialiser l'index du DataFrame final
final_df.reset_index(drop=True, inplace=True)

# Enregistrer le DataFrame final au format JSON
final_df.to_json(output_path, orient='records')

print(f"Data merged and saved to {output_path}")
