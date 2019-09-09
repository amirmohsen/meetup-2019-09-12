import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import RefreshIcon from '@material-ui/icons/Refresh';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Badge from '@material-ui/core/Badge';
import Loader from './Loader';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    badge: {
      width: '100%'
    },
    card: {
      width: '100%'
    },
    media: {
      height: 0,
      paddingTop: '56.25%' // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest
      })
    },
    expandOpen: {
      transform: 'rotate(180deg)'
    },
    avatar: {
      backgroundColor: red[500]
    }
  })
);

const Wrapper = styled.div`
  width: 100%;
`;

const TopNumberWrapper = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
`;

const NumberWrapper = styled(Typography)`
  word-break: break-word;
`;

const ResultCard = props => {
  const { number, index, duration, header, avatar, loading, onRefresh } = props;
  const classes = useStyles(props);
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = useCallback(() => {
    setExpanded(!expanded);
  }, [expanded, setExpanded]);

  if (loading) {
    return <Loader />;
  }

  if (!number) {
    return null;
  }

  return (
    <Wrapper>
      <Badge
        badgeContent={`${duration}ms`}
        color="secondary"
        className={classes.badge}
      >
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                {avatar}
              </Avatar>
            }
            action={
              <IconButton aria-label="refresh" onClick={onRefresh}>
                <RefreshIcon />
              </IconButton>
            }
            title={header}
            subheader={`Index: ${index}`}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="div">
              <TopNumberWrapper>{number}</TopNumberWrapper>
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <NumberWrapper paragraph>{number}</NumberWrapper>
            </CardContent>
          </Collapse>
        </Card>
      </Badge>
    </Wrapper>
  );
};

export default ResultCard;
