/* Last Update - Week 8, 2020 */
CREATE TABLE Matchups (
    Year INTEGER NOT NULL,
    Week INTEGER NOT NULL,
    Home_Team VARCHAR(17) NOT NULL,
    Home_Score NUMERIC(6,2) NOT NULL,
    Away_Team VARCHAR(17) NOT NULL,
    Away_Score NUMERIC(6,2) NOT NULL,
    Playoff VARCHAR(5) NOT NULL,
    Two_Week VARCHAR(5) NOT NULL,
    Regular_Season VARCHAR(5) NOT NULL
);
INSERT INTO Matchups VALUES
    (2017,1,'Sal DiVita',92.68,'Michael Buchman',103.14,'FALSE','FALSE', 'TRUE'),
    (2017,1,'Zach Way',109.54,'Ryan Rasmussen',89.64,'FALSE','FALSE', 'TRUE'),
    (2017,1,'Nick Eufrasio',73.02,'Tyler Brown',97.42,'FALSE','FALSE', 'TRUE'),
    (2017,1,'Brenden Zarrinnam',113.04,'Jonathan Setzke',104.08,'FALSE','FALSE', 'TRUE'),
    (2017,1,'Connor DeYoung',119.58,'James Earley',140.9,'FALSE','FALSE', 'TRUE'),
    (2017,1,'Joe Perry',132.22,'Grant Dakovich',79.12,'FALSE','FALSE', 'TRUE'),
    (2017,2,'Michael Buchman',122.64,'Grant Dakovich',99.82,'FALSE','FALSE', 'TRUE'),
    (2017,2,'Brenden Zarrinnam',109.82,'Zach Way',114.64,'FALSE','FALSE', 'TRUE'),
    (2017,2,'James Earley',103.84,'Sal DiVita',93.68,'FALSE','FALSE', 'TRUE'),
    (2017,2,'Tyler Brown',109.42,'Ryan Rasmussen',135.28,'FALSE','FALSE', 'TRUE'),
    (2017,2,'Connor DeYoung',83.58,'Nick Eufrasio',118.52,'FALSE','FALSE', 'TRUE'),
    (2017,2,'Joe Perry',121.06,'Jonathan Setzke',108.4,'FALSE','FALSE', 'TRUE'),
    (2017,3,'Nick Eufrasio',113.92,'Michael Buchman',95.6,'FALSE','FALSE', 'TRUE'),
    (2017,3,'Zach Way',103.5,'Sal DiVita',130.92,'FALSE','FALSE', 'TRUE'),
    (2017,3,'Grant Dakovich',106.9,'Brenden Zarrinnam',112.22,'FALSE','FALSE', 'TRUE'),
    (2017,3,'Ryan Rasmussen',100.66,'James Earley',115.9,'FALSE','FALSE', 'TRUE'),
    (2017,3,'Jonathan Setzke',76.32,'Tyler Brown',151.92,'FALSE','FALSE', 'TRUE'),
    (2017,3,'Joe Perry',108.54,'Connor DeYoung',104.36,'FALSE','FALSE', 'TRUE'),
    (2017,4,'Michael Buchman',102.04,'Joe Perry',110.28,'FALSE','FALSE', 'TRUE'),
    (2017,4,'Grant Dakovich',88.34,'Zach Way',110.72,'FALSE','FALSE', 'TRUE'),
    (2017,4,'Sal DiVita',97.48,'Ryan Rasmussen',95.18,'FALSE','FALSE', 'TRUE'),
    (2017,4,'Brenden Zarrinnam',100.76,'Nick Eufrasio',91.18,'FALSE','FALSE', 'TRUE'),
    (2017,4,'James Earley',126.28,'Jonathan Setzke',126.78,'FALSE','FALSE', 'TRUE'),
    (2017,4,'Tyler Brown',157.6,'Connor DeYoung',154.02,'FALSE','FALSE', 'TRUE'),
    (2017,5,'Tyler Brown',148.82,'Michael Buchman',77.66,'FALSE','FALSE', 'TRUE'),
    (2017,5,'Zach Way',67,'Ryan Rasmussen',120.2,'FALSE','FALSE', 'TRUE'),
    (2017,5,'Nick Eufrasio',123.54,'Grant Dakovich',122.88,'FALSE','FALSE', 'TRUE'),
    (2017,5,'Jonathan Setzke',80.54,'Sal DiVita',92.62,'FALSE','FALSE', 'TRUE'),
    (2017,5,'Joe Perry',90.26,'Brenden Zarrinnam',95.44,'FALSE','FALSE', 'TRUE'),
    (2017,5,'Connor DeYoung',113.94,'James Earley',124.54,'FALSE','FALSE', 'TRUE'),
    (2017,6,'James Earley',149.6,'Michael Buchman',104.58,'FALSE','FALSE', 'TRUE'),
    (2017,6,'Nick Eufrasio',95.52,'Zach Way',91.24,'FALSE','FALSE', 'TRUE'),
    (2017,6,'Ryan Rasmussen',129.42,'Jonathan Setzke',94.44,'FALSE','FALSE', 'TRUE'),
    (2017,6,'Grant Dakovich',128.42,'Joe Perry',83.34,'FALSE','FALSE', 'TRUE'),
    (2017,6,'Sal DiVita',110.48,'Connor DeYoung',127.1,'FALSE','FALSE', 'TRUE'),
    (2017,6,'Brenden Zarrinnam',130.52,'Tyler Brown',83.74,'FALSE','FALSE', 'TRUE'),
    (2017,7,'Michael Buchman',111.92,'Sal DiVita',108.06,'FALSE','FALSE', 'TRUE'),
    (2017,7,'Zach Way',93.34,'Jonathan Setzke',143.48,'FALSE','FALSE', 'TRUE'),
    (2017,7,'Joe Perry',119.02,'Nick Eufrasio',86.76,'FALSE','FALSE', 'TRUE'),
    (2017,7,'Connor DeYoung',106.26,'Ryan Rasmussen',128.72,'FALSE','FALSE', 'TRUE'),
    (2017,7,'Tyler Brown',111.16,'Grant Dakovich',126.82,'FALSE','FALSE', 'TRUE'),
    (2017,7,'James Earley',116.42,'Brenden Zarrinnam',97.76,'FALSE','FALSE', 'TRUE'),
    (2017,8,'Ryan Rasmussen',113.56,'Michael Buchman',105.72,'FALSE','FALSE', 'TRUE'),
    (2017,8,'Joe Perry',122.24,'Zach Way',78.26,'FALSE','FALSE', 'TRUE'),
    (2017,8,'Jonathan Setzke',129.12,'Connor DeYoung',134.78,'FALSE','FALSE', 'TRUE'),
    (2017,8,'Nick Eufrasio',58.82,'Tyler Brown',163.58,'FALSE','FALSE', 'TRUE'),
    (2017,8,'Grant Dakovich',112.2,'James Earley',109.26,'FALSE','FALSE', 'TRUE'),
    (2017,8,'Sal DiVita',86.02,'Brenden Zarrinnam',105.98,'FALSE','FALSE', 'TRUE'),
    (2017,9,'Michael Buchman',113.52,'Jonathan Setzke',125.3,'FALSE','FALSE', 'TRUE'),
    (2017,9,'Zach Way',129.52,'Connor DeYoung',123.44,'FALSE','FALSE', 'TRUE'),
    (2017,9,'Tyler Brown',85.38,'Joe Perry',101.08,'FALSE','FALSE', 'TRUE'),
    (2017,9,'James Earley',132.18,'Nick Eufrasio',88.46,'FALSE','FALSE', 'TRUE'),
    (2017,9,'Brenden Zarrinnam',117.54,'Ryan Rasmussen',112.12,'FALSE','FALSE', 'TRUE'),
    (2017,9,'Sal DiVita',60.9,'Grant Dakovich',136.3,'FALSE','FALSE', 'TRUE'),
    (2017,10,'Connor DeYoung',90.16,'Michael Buchman',117.2,'FALSE','FALSE', 'TRUE'),
    (2017,10,'Tyler Brown',115.02,'Zach Way',116.36,'FALSE','FALSE', 'TRUE'),
    (2017,10,'Joe Perry',94.58,'James Earley',158.76,'FALSE','FALSE', 'TRUE'),
    (2017,10,'Jonathan Setzke',99.78,'Brenden Zarrinnam',94.84,'FALSE','FALSE', 'TRUE'),
    (2017,10,'Nick Eufrasio',90.54,'Sal DiVita',83.14,'FALSE','FALSE', 'TRUE'),
    (2017,10,'Ryan Rasmussen',105.8,'Grant Dakovich',115.14,'FALSE','FALSE', 'TRUE'),
    (2017,11,'Zach Way',103.1,'Michael Buchman',102.34,'FALSE','FALSE', 'TRUE'),
    (2017,11,'James Earley',114.78,'Tyler Brown',138.62,'FALSE','FALSE', 'TRUE'),
    (2017,11,'Brenden Zarrinnam',141.76,'Connor DeYoung',182.16,'FALSE','FALSE', 'TRUE'),
    (2017,11,'Sal DiVita',83.6,'Joe Perry',117.22,'FALSE','FALSE', 'TRUE'),
    (2017,11,'Grant Dakovich',130.64,'Jonathan Setzke',120.58,'FALSE','FALSE', 'TRUE'),
    (2017,11,'Ryan Rasmussen',110.7,'Nick Eufrasio',66.1,'FALSE','FALSE', 'TRUE'),
    (2017,12,'Zach Way',110.64,'Michael Buchman',91.56,'FALSE','FALSE', 'FALSE'),
    (2017,12,'Ryan Rasmussen',124.68,'Brenden Zarrinnam',125.04,'TRUE','FALSE', 'FALSE'),
    (2017,12,'Grant Dakovich',140.86,'Tyler Brown',110.82,'TRUE','FALSE', 'FALSE'),
    (2017,12,'James Earley',142.18,'Joe Perry',165.88,'FALSE','FALSE', 'FALSE'),
    (2017,12,'Jonathan Setzke',96.62,'Sal DiVita',53.58,'FALSE','FALSE', 'FALSE'),
    (2017,12,'Connor DeYoung',129,'Nick Eufrasio',103.98,'FALSE','FALSE', 'FALSE'),
    (2017,13,'Grant Dakovich',334.52,'James Earley',188.18,'TRUE','TRUE', 'FALSE'),
    (2017,13,'Brenden Zarrinnam',208.12,'Joe Perry',242.76,'TRUE','TRUE', 'FALSE'),
    (2017,13,'Ryan Rasmussen',219.06,'Michael Buchman',168.14,'FALSE','TRUE', 'FALSE'),
    (2017,13,'Tyler Brown',272,'Connor DeYoung',207.42,'FALSE','TRUE', 'FALSE'),
    (2017,13,'Jonathan Setzke',238.32,'Nick Eufrasio',217.78,'FALSE','TRUE', 'FALSE'),
    (2017,13,'Sal DiVita',126.04,'Zach Way',224.4,'FALSE','TRUE', 'FALSE'),
    (2017,14,'Grant Dakovich',243.48,'Joe Perry',236.5,'TRUE','TRUE', 'FALSE'),
    (2017,14,'Brenden Zarrinnam',244.94,'James Earley',276.98,'TRUE','TRUE', 'FALSE'),
    (2017,14,'Sal DiVita',114.08,'Michael Buchman',156.34,'FALSE','TRUE', 'FALSE'),
    (2017,14,'Jonathan Setzke',247.92,'Tyler Brown',219.9,'FALSE','TRUE', 'FALSE'),
    (2017,14,'Connor DeYoung',142.8,'Ryan Rasmussen',294.7,'FALSE','TRUE', 'FALSE'),
    (2017,14,'Nick Eufrasio',156.38,'Zach Way',219,'FALSE','TRUE', 'FALSE'),
    (2018,1,'Michael Buchman',129.84,'Jonathan Setzke',157.46,'FALSE','FALSE', 'TRUE'),
    (2018,1,'Grant Dakovich',104.38,'Connor DeYoung',163.86,'FALSE','FALSE', 'TRUE'),
    (2018,1,'James Earley',137.32,'Ryan Rasmussen',119.94,'FALSE','FALSE', 'TRUE'),
    (2018,1,'Tyler Brown',95.22,'Brenden Zarrinnam',131.24,'FALSE','FALSE', 'TRUE'),
    (2018,1,'Joe Perry',99.24,'Nick Eufrasio',153.76,'FALSE','FALSE', 'TRUE'),
    (2018,2,'Connor DeYoung',144.7,'Michael Buchman',119.58,'FALSE','FALSE', 'TRUE'),
    (2018,2,'James Earley',140.24,'Grant Dakovich',93.26,'FALSE','FALSE', 'TRUE'),
    (2018,2,'Ryan Rasmussen',122.64,'Tyler Brown',137.38,'FALSE','FALSE', 'TRUE'),
    (2018,2,'Jonathan Setzke',138.24,'Joe Perry',157.5,'FALSE','FALSE', 'TRUE'),
    (2018,2,'Brenden Zarrinnam',104.1,'Nick Eufrasio',112.42,'FALSE','FALSE', 'TRUE'),
    (2018,3,'Grant Dakovich',85.72,'Michael Buchman',118.88,'FALSE','FALSE', 'TRUE'),
    (2018,3,'Tyler Brown',154.04,'James Earley',102.28,'FALSE','FALSE', 'TRUE'),
    (2018,3,'Joe Perry',115.1,'Connor DeYoung',126.84,'FALSE','FALSE', 'TRUE'),
    (2018,3,'Nick Eufrasio',148.24,'Ryan Rasmussen',118.8,'FALSE','FALSE', 'TRUE'),
    (2018,3,'Brenden Zarrinnam',67.16,'Jonathan Setzke',117.76,'FALSE','FALSE', 'TRUE'),
    (2018,4,'Michael Buchman',143.88,'Joe Perry',138,'FALSE','FALSE', 'TRUE'),
    (2018,4,'Tyler Brown',119.56,'Grant Dakovich',88.66,'FALSE','FALSE', 'TRUE'),
    (2018,4,'James Earley',165.28,'Nick Eufrasio',129.38,'FALSE','FALSE', 'TRUE'),
    (2018,4,'Connor DeYoung',161.26,'Brenden Zarrinnam',90.06,'FALSE','FALSE', 'TRUE'),
    (2018,4,'Ryan Rasmussen',165.22,'Jonathan Setzke',109.3,'FALSE','FALSE', 'TRUE'),
    (2018,5,'Brenden Zarrinnam',139.7,'Michael Buchman',115.52,'FALSE','FALSE', 'TRUE'),
    (2018,5,'Grant Dakovich',122,'Joe Perry',121.6,'FALSE','FALSE', 'TRUE'),
    (2018,5,'Nick Eufrasio',119.52,'Tyler Brown',152.6,'FALSE','FALSE', 'TRUE'),
    (2018,5,'Jonathan Setzke',136.96,'James Earley',103.38,'FALSE','FALSE', 'TRUE'),
    (2018,5,'Ryan Rasmussen',148.88,'Connor DeYoung',90.4,'FALSE','FALSE', 'TRUE'),
    (2018,6,'Michael Buchman',150.62,'Ryan Rasmussen',150.8,'FALSE','FALSE', 'TRUE'),
    (2018,6,'Nick Eufrasio',131.32,'Grant Dakovich',113.8,'FALSE','FALSE', 'TRUE'),
    (2018,6,'Joe Perry',92.68,'Brenden Zarrinnam',117.18,'FALSE','FALSE', 'TRUE'),
    (2018,6,'Tyler Brown',126.56,'Jonathan Setzke',159.68,'FALSE','FALSE', 'TRUE'),
    (2018,6,'James Earley',154.2,'Connor DeYoung',97.6,'FALSE','FALSE', 'TRUE'),
    (2018,7,'James Earley',113.46,'Michael Buchman',143.72,'FALSE','FALSE', 'TRUE'),
    (2018,7,'Grant Dakovich',82.68,'Brenden Zarrinnam',142.82,'FALSE','FALSE', 'TRUE'),
    (2018,7,'Jonathan Setzke',106.34,'Nick Eufrasio',139.1,'FALSE','FALSE', 'TRUE'),
    (2018,7,'Ryan Rasmussen',148.52,'Joe Perry',114.68,'FALSE','FALSE', 'TRUE'),
    (2018,7,'Connor DeYoung',120.56,'Tyler Brown',122.82,'FALSE','FALSE', 'TRUE'),
    (2018,8,'Tyler Brown',95.84,'Michael Buchman',123.04,'FALSE','FALSE', 'TRUE'),
    (2018,8,'Jonathan Setzke',155.66,'Grant Dakovich',107.46,'FALSE','FALSE', 'TRUE'),
    (2018,8,'Brenden Zarrinnam',106.52,'Ryan Rasmussen',130.04,'FALSE','FALSE', 'TRUE'),
    (2018,8,'Nick Eufrasio',117.1,'Connor DeYoung',115.36,'FALSE','FALSE', 'TRUE'),
    (2018,8,'Joe Perry',149.9,'James Earley',150.2,'FALSE','FALSE', 'TRUE'),
    (2018,9,'Michael Buchman',82.06,'Nick Eufrasio',116.34,'FALSE','FALSE', 'TRUE'),
    (2018,9,'Grant Dakovich',91.06,'Ryan Rasmussen',154.56,'FALSE','FALSE', 'TRUE'),
    (2018,9,'Connor DeYoung',187.6,'Jonathan Setzke',174,'FALSE','FALSE', 'TRUE'),
    (2018,9,'James Earley',87.18,'Brenden Zarrinnam',99.3,'FALSE','FALSE', 'TRUE'),
    (2018,9,'Tyler Brown',148.8,'Joe Perry',78.14,'FALSE','FALSE', 'TRUE'),
    (2018,10,'Jonathan Setzke',119.96,'Michael Buchman',160.9,'FALSE','FALSE', 'TRUE'),
    (2018,10,'Connor DeYoung',109.5,'Grant Dakovich',149.76,'FALSE','FALSE', 'TRUE'),
    (2018,10,'Ryan Rasmussen',53.96,'James Earley',153.02,'FALSE','FALSE', 'TRUE'),
    (2018,10,'Brenden Zarrinnam',123.16,'Tyler Brown',191.32,'FALSE','FALSE', 'TRUE'),
    (2018,10,'Nick Eufrasio',114.9,'Joe Perry',121.02,'FALSE','FALSE', 'TRUE'),
    (2018,11,'Michael Buchman',136.64,'Connor DeYoung',149.04,'FALSE','FALSE', 'TRUE'),
    (2018,11,'Grant Dakovich',90.98,'James Earley',159.98,'FALSE','FALSE', 'TRUE'),
    (2018,11,'Tyler Brown',126.16,'Ryan Rasmussen',121.38,'FALSE','FALSE', 'TRUE'),
    (2018,11,'Joe Perry',134.92,'Jonathan Setzke',134.58,'FALSE','FALSE', 'TRUE'),
    (2018,11,'Nick Eufrasio',91.92,'Brenden Zarrinnam',120.32,'FALSE','FALSE', 'TRUE'),
    (2018,12,'James Earley',157.84,'Tyler Brown',159.88,'FALSE','FALSE', 'FALSE'),
    (2018,12,'Connor DeYoung',98.98,'Ryan Rasmussen',116.82,'TRUE','FALSE', 'FALSE'),
    (2018,12,'Nick Eufrasio',118.44,'Brenden Zarrinnam',124.36,'TRUE','FALSE', 'FALSE'),
    (2018,12,'Michael Buchman',126.54,'Joe Perry',160.6,'FALSE','FALSE', 'FALSE'),
    (2018,12,'Grant Dakovich',127.34,'Jonathan Setzke',122.32,'FALSE','FALSE', 'FALSE'),
    (2018,13,'Tyler Brown',244.92,'Brenden Zarrinnam',253.28,'TRUE','TRUE', 'FALSE'),
    (2018,13,'James Earley',222.2,'Ryan Rasmussen',175.66,'TRUE','TRUE', 'FALSE'),
    (2018,13,'Michael Buchman',152.04,'Connor DeYoung',251.66,'FALSE','TRUE', 'FALSE'),
    (2018,13,'Joe Perry',262.08,'Jonathan Setzke',230.92,'FALSE','TRUE', 'FALSE'),
    (2018,13,'Grant Dakovich',263.76,'Nick Eufrasio',210.86,'FALSE','TRUE', 'FALSE'),
    (2018,14,'Brenden Zarrinnam',190.72,'James Earley',265.8,'TRUE','TRUE', 'FALSE'),
    (2018,14,'Ryan Rasmussen',254.58,'Tyler Brown',262.3,'TRUE','TRUE', 'FALSE'),
    (2018,14,'Grant Dakovich',244.3,'Michael Buchman',174.06,'FALSE','TRUE', 'FALSE'),
    (2018,14,'Joe Perry',208.7,'Connor DeYoung',249.4,'FALSE','TRUE', 'FALSE'),
    (2018,14,'Jonathan Setzke',285.4,'Nick Eufrasio',165.08,'FALSE','TRUE', 'FALSE'),
    (2019,1,'Nick Eufrasio',142.8,'Jonathan Setzke',85.96,'FALSE','FALSE', 'TRUE'),
    (2019,1,'Tyler Brown',153.4,'Brenden Zarrinnam',150.12,'FALSE','FALSE', 'TRUE'),
    (2019,1,'Grant Dakovich',129.06,'Connor DeYoung',114.76,'FALSE','FALSE', 'TRUE'),
    (2019,1,'James Earley',181.8,'Ryan Rasmussen',86.42,'FALSE','FALSE', 'TRUE'),
    (2019,1,'Joe Perry',121.42,'Michael Buchman',140,'FALSE','FALSE', 'TRUE'),
    (2019,2,'Jonathan Setzke',147.2,'Brenden Zarrinnam',107.22,'FALSE','FALSE', 'TRUE'),
    (2019,2,'Connor DeYoung',103.22,'Nick Eufrasio',110.26,'FALSE','FALSE', 'TRUE'),
    (2019,2,'Ryan Rasmussen',96.56,'Tyler Brown',112.9,'FALSE','FALSE', 'TRUE'),
    (2019,2,'Michael Buchman',141.76,'Grant Dakovich',145.98,'FALSE','FALSE', 'TRUE'),
    (2019,2,'Joe Perry',118.44,'James Earley',111.5,'FALSE','FALSE', 'TRUE'),
    (2019,3,'Connor DeYoung',130.24,'Jonathan Setzke',88.46,'FALSE','FALSE', 'TRUE'),
    (2019,3,'Brenden Zarrinnam',151.56,'Ryan Rasmussen',153.1,'FALSE','FALSE', 'TRUE'),
    (2019,3,'Nick Eufrasio',96.14,'Michael Buchman',171.14,'FALSE','FALSE', 'TRUE'),
    (2019,3,'Tyler Brown',163.84,'Joe Perry',120.66,'FALSE','FALSE', 'TRUE'),
    (2019,3,'Grant Dakovich',139.18,'James Earley',134.12,'FALSE','FALSE', 'TRUE'),
    (2019,4,'Jonathan Setzke',99.2,'Ryan Rasmussen',101.48,'FALSE','FALSE', 'TRUE'),
    (2019,4,'Michael Buchman',146.82,'Connor DeYoung',100.14,'FALSE','FALSE', 'TRUE'),
    (2019,4,'Joe Perry',105.68,'Brenden Zarrinnam',110.3,'FALSE','FALSE', 'TRUE'),
    (2019,4,'James Earley',155.3,'Nick Eufrasio',76.6,'FALSE','FALSE', 'TRUE'),
    (2019,4,'Grant Dakovich',150.98,'Tyler Brown',95.3,'FALSE','FALSE', 'TRUE'),
    (2019,5,'Michael Buchman',131.94,'Jonathan Setzke',150.96,'FALSE','FALSE', 'TRUE'),
    (2019,5,'Ryan Rasmussen',65.02,'Joe Perry',144.16,'FALSE','FALSE', 'TRUE'),
    (2019,5,'Connor DeYoung',134.92,'James Earley',134.04,'FALSE','FALSE', 'TRUE'),
    (2019,5,'Brenden Zarrinnam',115.54,'Grant Dakovich',141.04,'FALSE','FALSE', 'TRUE'),
    (2019,5,'Nick Eufrasio',157.24,'Tyler Brown',171.82,'FALSE','FALSE', 'TRUE'),
    (2019,6,'Jonathan Setzke',118.54,'Joe Perry',150.44,'FALSE','FALSE', 'TRUE'),
    (2019,6,'James Earley',114.32,'Michael Buchman',157.82,'FALSE','FALSE', 'TRUE'),
    (2019,6,'Grant Dakovich',130.64,'Ryan Rasmussen',101.42,'FALSE','FALSE', 'TRUE'),
    (2019,6,'Tyler Brown',141.1,'Connor DeYoung',100,'FALSE','FALSE', 'TRUE'),
    (2019,6,'Nick Eufrasio',135.9,'Brenden Zarrinnam',108.72,'FALSE','FALSE', 'TRUE'),
    (2019,7,'James Earley',107.78,'Jonathan Setzke',93.76,'FALSE','FALSE', 'TRUE'),
    (2019,7,'Joe Perry',75.24,'Grant Dakovich',160.22,'FALSE','FALSE', 'TRUE'),
    (2019,7,'Michael Buchman',146.46,'Tyler Brown',98.94,'FALSE','FALSE', 'TRUE'),
    (2019,7,'Ryan Rasmussen',104.36,'Nick Eufrasio',78.82,'FALSE','FALSE', 'TRUE'),
    (2019,7,'Connor DeYoung',100.36,'Brenden Zarrinnam',78.84,'FALSE','FALSE', 'TRUE'),
    (2019,8,'Jonathan Setzke',131.04,'Grant Dakovich',161.94,'FALSE','FALSE', 'TRUE'),
    (2019,8,'Tyler Brown',122.18,'James Earley',98.36,'FALSE','FALSE', 'TRUE'),
    (2019,8,'Nick Eufrasio',116.36,'Joe Perry',99.18,'FALSE','FALSE', 'TRUE'),
    (2019,8,'Brenden Zarrinnam',107.28,'Michael Buchman',184.36,'FALSE','FALSE', 'TRUE'),
    (2019,8,'Connor DeYoung',101.5,'Ryan Rasmussen',167.2,'FALSE','FALSE', 'TRUE'),
    (2019,9,'Tyler Brown',123.62,'Jonathan Setzke',110.2,'FALSE','FALSE', 'TRUE'),
    (2019,9,'Grant Dakovich',118.92,'Nick Eufrasio',101.04,'FALSE','FALSE', 'TRUE'),
    (2019,9,'James Earley',138,'Brenden Zarrinnam',111.88,'FALSE','FALSE', 'TRUE'),
    (2019,9,'Joe Perry',180.24,'Connor DeYoung',118.66,'FALSE','FALSE', 'TRUE'),
    (2019,9,'Michael Buchman',121.98,'Ryan Rasmussen',122.64,'FALSE','FALSE', 'TRUE'),
    (2019,10,'Jonathan Setzke',96.98,'Nick Eufrasio',121.7,'FALSE','FALSE', 'TRUE'),
    (2019,10,'Brenden Zarrinnam',113.64,'Tyler Brown',162.38,'FALSE','FALSE', 'TRUE'),
    (2019,10,'Connor DeYoung',138.26,'Grant Dakovich',121.12,'FALSE','FALSE', 'TRUE'),
    (2019,10,'Ryan Rasmussen',83.82,'James Earley',135.52,'FALSE','FALSE', 'TRUE'),
    (2019,10,'Michael Buchman',119.48,'Joe Perry',92.02,'FALSE','FALSE', 'TRUE'),
    (2019,11,'Brenden Zarrinnam',74.48,'Jonathan Setzke',130.52,'FALSE','FALSE', 'TRUE'),
    (2019,11,'Nick Eufrasio',128.96,'Connor DeYoung',89.38,'FALSE','FALSE', 'TRUE'),
    (2019,11,'Tyler Brown',132.92,'Ryan Rasmussen',85.42,'FALSE','FALSE', 'TRUE'),
    (2019,11,'Grant Dakovich',95.78,'Michael Buchman',129.96,'FALSE','FALSE', 'TRUE'),
    (2019,11,'James Earley',130.44,'Joe Perry',106.88,'FALSE','FALSE', 'TRUE'),
    (2019,12,'Joe Perry',98.54,'Connor DeYoung',108.98,'FALSE','FALSE', 'FALSE'),
    (2019,12,'James Earley',161.7,'Nick Eufrasio',107.12,'TRUE','FALSE', 'FALSE'),
    (2019,12,'Michael Buchman',154.08,'Ryan Rasmussen',51.56,'TRUE','FALSE', 'FALSE'),
    (2019,12,'Tyler Brown',129.8,'Jonathan Setzke',81.54,'FALSE','FALSE', 'FALSE'),
    (2019,12,'Grant Dakovich',122.66,'Brenden Zarrinnam',84.3,'FALSE','FALSE', 'FALSE'),
    (2019,13,'Grant Dakovich',242,'James Earley',275.86,'TRUE','TRUE', 'FALSE'),
    (2019,13,'Tyler Brown',255.7,'Michael Buchman',219.36,'TRUE','TRUE', 'FALSE'),
    (2019,13,'Nick Eufrasio',244.02,'Connor DeYoung',171.3,'FALSE','TRUE', 'FALSE'),
    (2019,13,'Ryan Rasmussen',215.82,'Joe Perry',192.26,'FALSE','TRUE', 'FALSE'),
    (2019,13,'Jonathan Setzke',224.58,'Brenden Zarrinnam',236.56,'FALSE','TRUE', 'FALSE'),
    (2019,14,'James Earley',295.22,'Tyler Brown',314.7,'TRUE','TRUE', 'FALSE'),
    (2019,14,'Michael Buchman',270.84,'Grant Dakovich',282.9,'TRUE','TRUE', 'FALSE'),
    (2019,14,'Ryan Rasmussen',234.06,'Nick Eufrasio',187.18,'FALSE','TRUE', 'FALSE'),
    (2019,14,'Brenden Zarrinnam',139.64,'Connor DeYoung',200.98,'FALSE','TRUE', 'FALSE'),
    (2019,14,'Jonathan Setzke',306.74,'Joe Perry',119.72,'FALSE','TRUE', 'FALSE'),
    (2020,1,'Jonathan Setzke',130.1,'Grant Dakovich',121.82,'FALSE','FALSE', 'TRUE'),
    (2020,1,'Michael Buchman',154,'Brenden Zarrinnam',120.4,'FALSE','FALSE', 'TRUE'),
    (2020,1,'James Earley',109.1,'Joe Perry',133.14,'FALSE','FALSE', 'TRUE'),
    (2020,1,'Ryan Rasmussen',161.18,'Nick Eufrasio',135.68,'FALSE','FALSE', 'TRUE'),
    (2020,2,'Grant Dakovich',125.6,'Brenden Zarrinnam',153.98,'FALSE','FALSE', 'TRUE'),
    (2020,2,'Joe Perry',110.18,'Jonathan Setzke',138.44,'FALSE','FALSE', 'TRUE'),
    (2020,2,'Nick Eufrasio',129.12,'Michael Buchman',158.74,'FALSE','FALSE', 'TRUE'),
    (2020,2,'Ryan Rasmussen',209.5,'James Earley',124.86,'FALSE','FALSE', 'TRUE'),
    (2020,3,'Joe Perry',129.6,'Grant Dakovich',112.96,'FALSE','FALSE', 'TRUE'),
    (2020,3,'Brenden Zarrinnam',179.48,'Nick Eufrasio',120.9,'FALSE','FALSE', 'TRUE'),
    (2020,3,'Jonathan Setzke',121.7,'Ryan Rasmussen',166.54,'FALSE','FALSE', 'TRUE'),
    (2020,3,'Michael Buchman',132.1,'James Earley',124.58,'FALSE','FALSE', 'TRUE'),
    (2020,4,'Grant Dakovich',108.1,'Nick Eufrasio',94.3,'FALSE','FALSE', 'TRUE'),
    (2020,4,'Ryan Rasmussen',188.32,'Joe Perry',134.04,'FALSE','FALSE', 'TRUE'),
    (2020,4,'James Earley',158.22,'Brenden Zarrinnam',112.2,'FALSE','FALSE', 'TRUE'),
    (2020,4,'Michael Buchman',90.22,'Jonathan Setzke',140.7,'FALSE','FALSE', 'TRUE'),
    (2020,5,'Ryan Rasmussen',135.62,'Grant Dakovich',118.28,'FALSE','FALSE', 'TRUE'),
    (2020,5,'Nick Eufrasio',118.18,'James Earley',99.94,'FALSE','FALSE', 'TRUE'),
    (2020,5,'Joe Perry',163.3,'Michael Buchman',167.8,'FALSE','FALSE', 'TRUE'),
    (2020,5,'Brenden Zarrinnam',119.32,'Jonathan Setzke',130.36,'FALSE','FALSE', 'TRUE'),
    (2020,6,'Grant Dakovich',96,'James Earley',130.44,'FALSE','FALSE', 'TRUE'),
    (2020,6,'Michael Buchman',115.92,'Ryan Rasmussen',96.88,'FALSE','FALSE', 'TRUE'),
    (2020,6,'Jonathan Setzke',80.48,'Nick Eufrasio',112.94,'FALSE','FALSE', 'TRUE'),
    (2020,6,'Brenden Zarrinnam',144.38,'Joe Perry',111.3,'FALSE','FALSE', 'TRUE'),
    (2020,7,'Michael Buchman',178.6,'Grant Dakovich',106.86,'FALSE','FALSE', 'TRUE'),
    (2020,7,'James Earley',106.54,'Jonathan Setzke',113.82,'FALSE','FALSE', 'TRUE');
INSERT INTO Matchups VALUES
    (2020,7,'Ryan Rasmussen',108.98,'Brenden Zarrinnam',121.92,'FALSE','FALSE', 'TRUE'),
    (2020,7,'Nick Eufrasio',110.72,'Joe Perry',153,'FALSE','FALSE', 'TRUE'),
    (2020,8,'Michael Buchman',122.52,'Brenden Zarrinnam',91.02,'FALSE','FALSE', 'TRUE'),
    (2020,8,'Jonathan Setzke',126.92,'Grant Dakovich',98.94,'FALSE','FALSE', 'TRUE'),
    (2020,8,'James Earley',101.82,'Joe Perry',133.74,'FALSE','FALSE', 'TRUE'),
    (2020,8,'Ryan Rasmussen',141.86,'Nick Eufrasio',98.34,'FALSE','FALSE', 'TRUE'),
    (2020,9,'Grant Dakovich',118.54,'Brenden Zarrinnam',96.04,'FALSE','FALSE','TRUE'),
    (2020,9,'Joe Perry',121.58,'Jonathan Setzke',156.96,'FALSE','FALSE','TRUE'),
    (2020,9,'Nick Eufrasio',100.20,'Michael Buchman',153.22,'FALSE','FALSE','TRUE'),
    (2020,9,'Ryan Rasmussen',124.20,'James Earley',103.90,'FALSE','FALSE','TRUE'),
    (2020,10,'Joe Perry',88.20,'Grant Dakovich',91.02,'FALSE','FALSE','TRUE'),
    (2020,10,'Brenden Zarrinnam',126.62,'Nick Eufrasio',103.92,'FALSE','FALSE','TRUE'),
    (2020,10,'Jonathan Setzke',106.52,'Ryan Rasmussen',137.06,'FALSE','FALSE','TRUE'),
    (2020,10,'Michael Buchman',140.40,'James Earley',87.76,'FALSE','FALSE','TRUE'),
    (2020,11,'Grant Dakovich',141.76,'Nick Eufrasio',131.18,'FALSE','FALSE','TRUE'),
    (2020,11,'Ryan Rasmussen',130.20,'Joe Perry',111.92,'FALSE','FALSE','TRUE'),
    (2020,11,'James Earley',131.30,'Brenden Zarrinnam',113.38,'FALSE','FALSE','TRUE'),
    (2020,11,'Michael Buchman',153.06,'Jonathan Setzke',148.90,'FALSE','FALSE','TRUE'),
    (2020,12,'Joe Perry',92.48,'Michael Buchman',147.60,'FALSE','FALSE','TRUE'),
    (2020,12,'Ryan Rasmussen',119.78,'Grant Dakovich',155.12,'FALSE','FALSE','TRUE'),
    (2020,12,'Nick Eufrasio',129.40,'James Earley',134.68,'FALSE','FALSE','TRUE'),
    (2020,12,'Brenden Zarrinnam',129.60,'Jonathan Setzke',141.72,'FALSE','FALSE','TRUE'),
    (2020,13,'Brenden Zarrinnam',242.78,'Michael Buchman',337.48,'TRUE','TRUE','FALSE'),
    (2020,13,'Jonathan Setzke',198.62,'Ryan Rasmussen',253.82,'TRUE','TRUE','FALSE'),
    (2020,13,'Joe Perry',243.80,'Grant Dakovich',177.50,'FALSE','TRUE','FALSE'),
    (2020,13,'Nick Eufrasio',179.06,'James Earley',316.50,'FALSE','TRUE','FALSE'),
    (2020,14,'Ryan Rasmussen',342.06,'Michael Buchman',316.52,'TRUE','TRUE','FALSE'),
    (2020,14,'Brenden Zarrinnam',268.14,'Jonathan Setzke',279.80,'TRUE','TRUE','FALSE'),
    (2020,14,'James Earley',267.34,'Joe Perry',225.24,'FALSE','TRUE','FALSE'),
    (2020,14,'Nick Eufrasio',234.12,'Grant Dakovich',218.28,'FALSE','TRUE','FALSE'),
	(2021,1,'James Earley',140.66,'Ryan Rasmussen',122.05,'FALSE','TRUE','FALSE'),
	(2021,1,'Michael Buchman',123.33,'Tyler Brown',171.37,'FALSE','TRUE','FALSE'),
	(2021,1,'Jonathan Setzke',121.21,'Nick Eufrasio',163.46,'FALSE','TRUE','FALSE'),
	(2021,1,'Connor DeYoung',80.95,'Joe Perry',158.98,'FALSE','TRUE','FALSE'),
	(2021,1,'Brenden Zarrinnam',99.67,'Grant Dakovich',89.62,'FALSE','TRUE','FALSE'),
	(2021,2,'Ryan Rasmussen',114.41,'Tyler Brown',152.12,'FALSE','TRUE','FALSE'),
	(2021,2,'Nick Eufrasio',134.42,'James Earley',102.9,'FALSE','TRUE','FALSE'),
	(2021,2,'Joe Perry',113.12,'Michael Buchman',134.33,'FALSE','TRUE','FALSE'),
	(2021,2,'Grant Dakovich',127.3,'Jonathan Setzke',109.94,'FALSE','TRUE','FALSE'),
	(2021,2,'Brenden Zarrinnam',109.88,'Connor DeYoung',188.76,'FALSE','TRUE','FALSE'),
	(2021,3,'Nick Eufrasio',111.72,'Ryan Rasmussen',112.82,'FALSE','TRUE','FALSE'),
	(2021,3,'Tyler Brown',146.15,'Joe Perry',115.24,'FALSE','TRUE','FALSE'),
	(2021,3,'James Earley',122.09,'Grant Dakovich',147.29,'FALSE','TRUE','FALSE'),
	(2021,3,'Michael Buchman',130.28,'Brenden Zarrinnam',136.97,'FALSE','TRUE','FALSE'),
	(2021,3,'Jonathan Setzke',101.74,'Connor DeYoung',134.93,'FALSE','TRUE','FALSE'),
	(2021,4,'Ryan Rasmussen',91.32,'Joe Perry',127.38,'FALSE','TRUE','FALSE'),
	(2021,4,'Grant Dakovich',126.77,'Nick Eufrasio',113.36,'FALSE','TRUE','FALSE'),
	(2021,4,'Brenden Zarrinnam',143.22,'Tyler Brown',118.22,'FALSE','TRUE','FALSE'),
	(2021,4,'Connor DeYoung',140.29,'James Earley',170.82,'FALSE','TRUE','FALSE'),
	(2021,4,'Jonathan Setzke',101.91,'Michael Buchman',109.45,'FALSE','TRUE','FALSE'),
	(2021,5,'Grant Dakovich',160.91,'Ryan Rasmussen',125.05,'FALSE','TRUE','FALSE'),
	(2021,5,'Joe Perry',149.32,'Brenden Zarrinnam',127.98,'FALSE','TRUE','FALSE'),
	(2021,5,'Nick Eufrasio',131.48,'Connor DeYoung',193.13,'FALSE','TRUE','FALSE'),
	(2021,5,'Tyler Brown',114.13,'Jonathan Setzke',173.69,'FALSE','TRUE','FALSE'),
	(2021,5,'James Earley',139.51,'Michael Buchman',116.35,'FALSE','TRUE','FALSE'),
	(2021,6,'Ryan Rasmussen',133.17,'Brenden Zarrinnam',97.25,'FALSE','TRUE','FALSE'),
	(2021,6,'Connor DeYoung',114.78,'Grant Dakovich',134.45,'FALSE','TRUE','FALSE'),
	(2021,6,'Jonathan Setzke',110.58,'Joe Perry',152.75,'FALSE','TRUE','FALSE'),
	(2021,6,'Michael Buchman',120.29,'Nick Eufrasio',127.09,'FALSE','TRUE','FALSE'),
	(2021,6,'James Earley',146.11,'Tyler Brown',144.93,'FALSE','TRUE','FALSE'),
	(2021,7,'Connor DeYoung',116.88,'Ryan Rasmussen',144.44,'FALSE','TRUE','FALSE'),
	(2021,7,'Brenden Zarrinnam',133.54,'Jonathan Setzke',115.69,'FALSE','TRUE','FALSE'),
	(2021,7,'Grant Dakovich',116.81,'Michael Buchman',120.41,'FALSE','TRUE','FALSE'),
	(2021,7,'Joe Perry',117.3,'James Earley',131.84,'FALSE','TRUE','FALSE'),
	(2021,7,'Nick Eufrasio',135.97,'Tyler Brown',100.49,'FALSE','TRUE','FALSE'),
	(2021,8,'Ryan Rasmussen',136.31,'Jonathan Setzke',95.46,'FALSE','TRUE','FALSE'),
	(2021,8,'Michael Buchman',125.9,'Connor DeYoung',107.91,'FALSE','TRUE','FALSE'),
	(2021,8,'James Earley',130.32,'Brenden Zarrinnam',73.35,'FALSE','TRUE','FALSE'),
	(2021,8,'Tyler Brown',123.9,'Grant Dakovich',118.86,'FALSE','TRUE','FALSE'),
	(2021,8,'Nick Eufrasio',104.28,'Joe Perry',107.82,'FALSE','TRUE','FALSE'),
	(2021,9,'Michael Buchman',116.46,'Ryan Rasmussen',92.61,'FALSE','TRUE','FALSE'),
	(2021,9,'Jonathan Setzke',97.9,'James Earley',90.83,'FALSE','TRUE','FALSE'),
	(2021,9,'Connor DeYoung',102.79,'Tyler Brown',98.14,'FALSE','TRUE','FALSE'),
	(2021,9,'Brenden Zarrinnam',115.03,'Nick Eufrasio',85.74,'FALSE','TRUE','FALSE'),
	(2021,9,'Grant Dakovich',109.67,'Joe Perry',121.94,'FALSE','TRUE','FALSE'),
	(2021,10,'Ryan Rasmussen',88.49,'James Earley',150.47,'FALSE','TRUE','FALSE'),
	(2021,10,'Tyler Brown',143.7,'Michael Buchman',93.77,'FALSE','TRUE','FALSE'),
	(2021,10,'Nick Eufrasio',67.44,'Jonathan Setzke',92.81,'FALSE','TRUE','FALSE'),
	(2021,10,'Joe Perry',128.8,'Connor DeYoung',107.27,'FALSE','TRUE','FALSE'),
	(2021,10,'Grant Dakovich',96.08,'Brenden Zarrinnam',118.74,'FALSE','TRUE','FALSE'),
	(2021,11,'Tyler Brown',126.25,'Ryan Rasmussen',111.21,'FALSE','TRUE','FALSE'),
	(2021,11,'James Earley',142.93,'Nick Eufrasio',119.68,'FALSE','TRUE','FALSE'),
	(2021,11,'Michael Buchman',135.44,'Joe Perry',164.98,'FALSE','TRUE','FALSE'),
	(2021,11,'Jonathan Setzke',109.78,'Grant Dakovich',121.2,'FALSE','TRUE','FALSE'),
	(2021,11,'Connor DeYoung',123.32,'Brenden Zarrinnam',121.56,'FALSE','TRUE','FALSE'),
	(2021,12,'Ryan Rasmussen',116.85,'Nick Eufrasio',96.88,'FALSE','TRUE','FALSE'),
	(2021,12,'Joe Perry',123.37,'Tyler Brown',137.7,'FALSE','TRUE','FALSE'),
	(2021,12,'Grant Dakovich',150.33,'James Earley',87.76,'FALSE','TRUE','FALSE'),
	(2021,12,'Brenden Zarrinnam',89.6,'Michael Buchman',137.48,'FALSE','TRUE','FALSE'),
	(2021,12,'Connor DeYoung',93.15,'Jonathan Setzke',140.89,'FALSE','TRUE','FALSE');
