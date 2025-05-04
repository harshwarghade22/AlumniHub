import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.metrics import jaccard_score
from sklearn.preprocessing import MultiLabelBinarizer
import numpy as np


alumni_df = pd.read_csv("/content/alumni_data.csv")

from google.colab import drive
drive.mount('/content/drive')

student_df = pd.read_csv("/content/alumni_data.csv")

alumni_df
student_df.head()

alumni_df = alumni_df.drop(['Year of Graduation','Branch','Current Designation','Company'], axis = 1)
alumni_df

# student_df = student_df.drop(['Email_id','Password'], axis = 1)
student_df

alumni_df.dropna(inplace=True)
student_df.dropna(inplace=True)

# # Convert skills to strings before passing to MultiLabelBinarizer
from sklearn.preprocessing import MultiLabelBinarizer

# Convert skills column to list of skills
alumni_skills = [str(skills).split(", ") for skills in alumni_df['Skills']]
student_skills = [str(skills).split(", ") for skills in student_df['Skills']]

# Fit MultiLabelBinarizer
mlb = MultiLabelBinarizer()
mlb.fit(alumni_skills + student_skills)

# Transform skills into binary vectors
alumni_skills_binary = mlb.transform(alumni_skills)
student_skills_binary = mlb.transform(student_skills)


# Compute cosine similarity between alumni and students based on skills
cosine_sim = cosine_similarity(alumni_skills_binary, student_skills_binary)

cosine_sim

cosine_sim.shape



# For each student, recommend alumni based on highest cosine similarity
recommendations = {}
for i, student in enumerate(student_df['Name']):
    similarity_scores = cosine_sim[:, i]  # Get similarity scores for current student
    top_alumni_indices = np.argsort(similarity_scores)[::-1][:10]  # Get top 10 most similar alumni
    top_alumni = alumni_df.iloc[top_alumni_indices]['Name'].tolist()  # Get names of top alumni
    recommendations[student] = top_alumni  # Add recommendations to dictionary

# Print recommendations for each student
for student, alumni in recommendations.items():
    print(f"{student} may be interested in connecting with:")
    for a in alumni:
        print(f"- {a}")
    print()



