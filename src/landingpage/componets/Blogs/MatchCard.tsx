import React from "react";
import { Card, Typography, Box } from "@mui/material";
import dayjs from "dayjs";

interface MatchCardProps {
  date: string; // in format 'YYYY-MM-DD'
  homeTeam: string;
  awayTeam: string;
  homeLogo: string;
  awayLogo: string;
  time: string; // in format 'HH:mm'
  competition: string;
}

const MatchCard: React.FC<MatchCardProps> = ({
  date,
  homeTeam,
  awayTeam,
  homeLogo,
  awayLogo,
  time,
  competition,
}) => {
  const matchDate = dayjs(date);
  const now = dayjs();

  const isUpcoming = matchDate.isAfter(now, "day");
  const status = isUpcoming ? "Upcoming" : "Previous";

  return (
    <Card sx={{ maxWidth: 400, textAlign: "center", mx: "auto", p: 2 }}>
      <Typography variant="subtitle2" color="text.secondary">
        NEXT FIXTURE
      </Typography>

      <Typography variant="body2" sx={{ textAlign: "right", mt: -3 }}>
        {status}
      </Typography>

      <Typography variant="h6" sx={{ my: 1 }}>
        {matchDate.format("ddd D MMM")}
      </Typography>
      <Typography variant="subtitle2" color="text.secondary">
        {competition}
      </Typography>

      <Box display="flex" alignItems="center" justifyContent="space-around" mt={2}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <img src={homeLogo} alt={homeTeam} width={50} />
          <Typography variant="subtitle1">{homeTeam}</Typography>
        </Box>

        <Box>
          <Typography
            variant="h6"
            sx={{
              border: "1px solid #ccc",
              px: 1.5,
              py: 0.5,
              borderRadius: 1,
              fontSize: "1rem",
            }}
          >
            {time}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            BST
          </Typography>
        </Box>

        <Box display="flex" flexDirection="column" alignItems="center">
          <img src={awayLogo} alt={awayTeam} width={50} />
          <Typography variant="subtitle1">{awayTeam}</Typography>
        </Box>
      </Box>

      <Typography variant="body2" sx={{ textAlign: "right", mt: 1, color: "blue", cursor: "pointer" }}>
        All fixtures →
      </Typography>
    </Card>
  );
};

export default MatchCard;
