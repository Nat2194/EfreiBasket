import requests
import os
from bs4 import BeautifulSoup

# Absolute path of the script directory
global script_dir
script_dir= os.path.dirname(os.path.abspath(__file__))

# Fonction pour extraire le __RequestVerificationToken à partir de la page
def get_verification_token(url):
    # Effectuez une requête GET pour obtenir la page
    response = requests.get(url)

    # Vérifiez si la requête a réussi
    if response.status_code == 200:
        # Utilisez BeautifulSoup pour analyser la page
        soup = BeautifulSoup(response.text, 'html.parser')

        # Recherchez l'élément contenant le token (utilisez l'inspecteur du navigateur pour trouver l'ID ou la classe)
        token_element = soup.find('input', {'name': '__RequestVerificationToken'})

        # Extrayez la valeur du token
        token_value = token_element['value'] if token_element else None

        return token_value

    else:
        print(f"Erreur lors de la récupération de la page ({response.status_code})")
        return None

def scrape(category, team_name):
    # URL de la page à scraper
    url = 'http://sportco.abyss-clients.com/rencontres'

    # Obtenez le __RequestVerificationToken
    verification_token = get_verification_token(url)

    if verification_token:
        print(f"Token extrait : {verification_token}")

        # URL de l'API cible où vous souhaitez envoyer la requête POST
        api_url = f"http://sportco.abyss-clients.com/rencontres/{category}"

        # Données à inclure dans la requête POST (ajoutez vos données ici)
        payload = {
            'id': 1,
            'GrpId': 17,
            'AssoLibelle': team_name,
            'EquLibelle': team_name,
            'SportLibelle': 'BASKET BALL',
            'NivLibelle': 'NIVEAU 2 : GRANDES ECOLES',
        }

        # Entêtes de la requête
        headers = {
            'User-Agent': 'Chrome/116.0.0.0',
            'Referer': url,
        }


        response = requests.post(api_url, data=payload, headers=headers)

        # Effectuez la requête POST pour déclencher le téléchargement
        export_url = f"http://sportco.abyss-clients.com/rencontres/{category}/export"  # L'URL d'export

        response = requests.post(export_url, data=payload, headers=headers)

        # Vérifiez la réponse du serveur
        # Vérifier si la requête a réussi (code de statut 200)
        if response.status_code == 200:
            # Spécifiez le chemin du fichier où vous souhaitez enregistrer le téléchargement
            filename = os.path.join(script_dir, "..", "data",f"{category}_{team_name}.xlsx")
            filename = os.path.normpath(filename)

            # Ouvrir le fichier en mode binaire et écrire le contenu téléchargé
            with open(filename, "wb") as file:
                file.write(response.content)

            print(f"{category} pour {team_name} a été téléchargé et enregistré sous : {filename}")
        else:
            print(f"La requête a échoué avec le code de statut : {response.status_code}")

# Scraping pour "EFREI"
scrape("planning", "EFREI")
scrape("resultats", "EFREI")
scrape("classements", "EFREI")

# Scraping pour "EFREI PARIS"
scrape("planning", "EFREI PARIS")
scrape("resultats", "EFREI PARIS")
scrape("classements", "EFREI PARIS")
