CREATE TABLE Keepers (
    Owner VARCHAR(17) NOT NULL,
    Player VARCHAR(24) NOT NULL,
    OriginalRd NUMERIC(1,0) NOT NULL,
    KeeperRd NUMERIC(1,0) NOT NULL,
    YearsKept NUMERIC(1,0) NOT NULL
);
INSERT INTO Keepers VALUES 
    ('Tyler Brown',"Christian McCaffrey",1,1,1);
