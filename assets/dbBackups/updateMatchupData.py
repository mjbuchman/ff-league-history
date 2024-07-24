from espn_api.football import League

def get_size(fileobject):
    fileobject.seek(0,2) # move the cursor to the end of the file
    size = fileobject.tell()
    return size

def updateMatchups(year, startWeek, weeksToAdd, playoffs, doubleWeek, regSeason):
	rawData = open("./rawCSV/raw_matchup_data.csv", "a")
	sqlData = open("./dbTables/Matchups.sql", "a")
	fsize = get_size(sqlData)
	sqlData.truncate(fsize - 1) # remove semicolon at end
	sqlData.write(',')

	league = League(league_id=1667721, year=year)	
	for week in range(startWeek,startWeek+weeksToAdd):
		for matchup in league.scoreboard(week):
			rawData.write('\n' +
						str(year) + ',' +
						str(week) + ',' +
						matchup.home_team.owners[0]["firstName"] + ' ' + matchup.home_team.owners[0]["lastName"] + ',' +
						str(matchup.home_score) + ',' +
						matchup.away_team.owners[0]["firstName"] + ' ' + matchup.away_team.owners[0]["lastName"] + ',' +
						str(matchup.away_score) + ',' +
						playoffs.upper() + ',' +
						doubleWeek.upper() + ',' +
						regSeason.upper()
			)
		
			sqlData.write('\n\t(' +
						str(year) + ',' +
						str(week) + ',' +
						'\'' + matchup.home_team.owners[0]["firstName"] + ' ' + matchup.home_team.owners[0]["lastName"] + '\',' +
						str(matchup.home_score) + ',' +
						'\'' + matchup.away_team.owners[0]["firstName"] + ' ' + matchup.away_team.owners[0]["lastName"] + '\',' +
						str(matchup.away_score) + ',' +
						'\'' + playoffs.upper() + '\',' +
						'\'' + doubleWeek.upper() + '\',' +
						'\'' + regSeason.upper() + '\'),'
			)

	fsize = get_size(sqlData)
	sqlData.truncate(fsize - 1) # remove comma at end
	sqlData.write(';')

	rawData.close()
	sqlData.close()

def main():
	year = int(input("Enter Year: "))
	startWeek = int(input("Enter Start Week: "))
	weeksToAdd = int(input("Enter # Weeks to Add: "))
	playoffs = input("Playoffs? (true or false): ")
	doubleWeek = input("Double Week? (true or false): ")
	regSeason = input("Regular Season? (true or false): ")
	updateMatchups(year, startWeek, weeksToAdd, playoffs, doubleWeek, regSeason)

if __name__ == "__main__":
    main()