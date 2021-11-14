from espn_api.football import League
import sys

def get_size(fileobject):
    fileobject.seek(0,2) # move the cursor to the end of the file
    size = fileobject.tell()
    return size

year = int(sys.argv[1])
startWeek = int(sys.argv[2])
weeksToAdd = int(sys.argv[3])

rawData = open("./raw_matchup_data.csv", "a")
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
      		matchup.home_team.owner + ',' +
      		str(matchup.home_score) + ',' +
      		matchup.away_team.owner + ',' +
      		str(matchup.away_score) + ',' +
      		sys.argv[4].upper() + ',' +
      		sys.argv[5].upper() + ',' +
      		sys.argv[6].upper()
		)
  
		sqlData.write('\n\t(' +
      		str(year) + ',' +
      		str(week) + ',' +
      		'\'' + matchup.home_team.owner + '\',' +
      		str(matchup.home_score) + ',' +
      		'\'' + matchup.away_team.owner + '\',' +
      		str(matchup.away_score) + ',' +
      		'\'' + sys.argv[4].upper() + '\',' +
      		'\'' + sys.argv[5].upper() + '\',' +
      		'\'' + sys.argv[6].upper() + '\'),'
		)

fsize = get_size(sqlData)
sqlData.truncate(fsize - 1) # remove semicolon at end
sqlData.write(';')

rawData.close()
sqlData.close()