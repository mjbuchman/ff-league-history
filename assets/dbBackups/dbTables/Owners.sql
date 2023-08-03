/* Last Updated After 2021 Season */
CREATE TABLE Owners (
    Owner VARCHAR(17) NOT NULL,
    Best_Placement_RS NUMERIC(1,0) NOT NULL,
    Best_Placement_Final NUMERIC(1,0) NOT NULL,
    Last_Place_RS NUMERIC(1,0) NOT NULL,
    Season_HS NUMERIC(1,0) NOT NULL,
    RS_Champion NUMERIC(1,0) NOT NULL,
    Champ_App NUMERIC(1,0) NOT NULL,
    Championships NUMERIC(1,0) NOT NULL
);
INSERT INTO Owners VALUES 
    ('Brenden Zarrinnam',3,2,1,0,0,1,0),
    ('Connor DeYoung',4,5,0,0,0,0,0),
    ('Grant Dakovich',1,1,1,0,1,1,1),
    ('James Earley',1,1,0,1,1,2,1),
    ('Joe Perry',1,2,0,0,1,1,0),
    ('Jonathan Setzke',3,3,1,1,0,0,0),
    ('Michael Buchman',1,1,0,2,1,2,1),
    ('Nick Eufrasio',3,6,1,0,0,0,0),
    ('Ryan Rasmussen',2,1,0,0,0,1,1),
    ('Tyler Brown',1,1,0,1,1,2,1);
							