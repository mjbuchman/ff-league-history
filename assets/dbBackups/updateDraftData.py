from espn_api.football import League

def get_size(fileobject):
	fileobject.seek(0,2) # move the cursor to the end of the file
	size = fileobject.tell()
	return size

def updateDrafts(year):
	rawData = open("./rawCSV/raw_draft_data.csv", "a")
	sqlData = open("./dbTables/Drafts.sql", "a")
	fsize = get_size(sqlData)
	sqlData.truncate(fsize - 1) # remove semicolon at end
	sqlData.write(',')

	league = League(league_id=1667721, year=year)	
	for pick in league.draft:
		player = league.player_info(playerId = pick.playerId)
		gp = -1 # bad workaround for counting the bye week
		for key in player.stats:
			if(player.stats[key]["breakdown"]):
				gp += 1
		avgPts = round(player.total_points/gp, 2) if gp > 0 else 0
		prk = 200 if player.posRank == 0 else player.posRank
		draftPick = {"year": year, "round": pick.round_num, "pick": pick.round_pick, "name": player.name, "team": player.proTeam, "position": player.position, "owner": pick.team.owner, "prk": prk, "gp": gp, "fptsg": avgPts, "fpts": player.total_points}
		rawData.write('\n' +
			str(year) + ',' +
			str(pick.round_num) + ',' +
			str(pick.round_pick) + ',' +
			player.name + ',' +
			player.proTeam + ',' +
			player.position + ',' +
			pick.team.owner + ',' +
			str(prk) + ',' +
			str(gp) + ',' +
			str(avgPts) + ',' +
			str(player.total_points)
		)
		sqlData.write('\n(' +
			str(year) + ',' +
			str(pick.round_num) + ',' +
			str(pick.round_pick) + ',' +
			'\'' + player.name + '\',' +
			'\'' + player.proTeam + '\',' +
			'\'' + player.position + '\',' +
			'\'' + pick.team.owner + '\',' +
			str(prk) + ',' +
			str(gp) + ',' +
			str(avgPts) + ',' +
			str(player.total_points) + '),'
		)

	fsize = get_size(sqlData)
	sqlData.truncate(fsize - 1) # remove comma at end
	sqlData.write(';')

	rawData.close()
	sqlData.close()

def main():
	year = int(input("Enter Year: "))
	updateDrafts(year)

if __name__ == "__main__":
    main()