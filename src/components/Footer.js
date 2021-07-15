/** @jsx jsx */
// eslint-disable-next-line
import React from 'react'
import { css, jsx } from '@emotion/core'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import map from '../assets/map.png'

const styles = {
  footerImg: css`
    @media (max-width: 500px) {
      height: 120px;
    }
  `,
}

const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: theme.palette.common.lightGrey,
    padding: theme.spacing(6),
  },
  img: {
    height: '180px',
    margin: 'auto',
    display: 'block',
    border: '1px solid lightgrey',
    borderRadius: '4px',
    position: 'relative',
    bottom: '10px',
  },
}))

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit">Geomedic</Link> {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

function Footer() {
  const classes = useStyles()

  return (
    <footer className={classes.footer}>
      <Typography variant="h6" align="center" gutterBottom />
      <img src={map} alt="map" className={classes.img} css={styles.footerImg} />
      <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
        Geomedic consultorio <br />
        Av. Diego Maradona 1978, Buenos Aires, Argentina <br />
        +54 9 4760-4354
      </Typography>
      <Copyright />
    </footer>
  )
}

export default Footer
