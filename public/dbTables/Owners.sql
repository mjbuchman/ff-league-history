/* Last Update - After 2019 Season */
CREATE TABLE Matchups (
    Owner VARCHAR(17) NOT NULL,
    Best_Placement_RS NUMERIC(1,0) NOT NULL,
    Best_Placement_Final NUMERIC(1,0) NOT NULL,
    Last_Place_RS NUMERIC(1,0) NOT NULL,
    Season_HS NUMERIC(1,0) NOT NULL,
    RS_Champion NUMERIC(1,0) NOT NULL,
    Champ_App NUMERIC(1,0) NOT NULL,
    Championships NUMERIC(1,0) NOT NULL,
);
INSERT INTO Owners VALUES 
    ('Michael Buchman',1,2,0,2,1,1,0),
    ('Jonathan Setzke',3,3,0,1,0,0,0),
    ('James Earley',1,1,0,1,1,2,1),
    ('Grant Dakovich',1,1,1,0,1,1,1),
    ('Brenden Zarrinnam',3,2,1,0,0,1,0),
    ('Ryan Rasmussen',2,1,0,0,0,1,1),
    ('Connor DeYoung',4,5,0,0,0,0,0),
    ('Tyler Brown',1,1,0,0,1,1,1),
    ('Joe Perry',2,2,0,0,0,1,0),
    ('Nick Eufrasio',3,6,1,0,0,0,0);
