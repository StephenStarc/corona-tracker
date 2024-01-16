import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import styles from './Cards.module.css'
import { Grid } from '@mui/material';
import CountUp from 'react-countup';
import cx from 'classnames'
export default function Cards({data:{confirmed,deaths,recovered,lastUpdated}}){
    if(!confirmed){
        return 'Loading...'
    }
    return(
    <div className={styles.container}>
        <Grid container spacing={3} justify='center'>
            <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.infected)}>
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>Infected</Typography>
                    <Typography variant='h5' >
                        <CountUp start={0} end={confirmed} duration={2.5} separator=','/>
                    </Typography>
                    <Typography color="textSecondary" >{new Date(lastUpdated).toDateString()}</Typography>
                    <Typography variant='body2' >Number of Active Cases of COVID-19</Typography>
                </CardContent>
            </Grid>
            <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.recovered)}>
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>Recovered</Typography>
                    <Typography variant='h5' >
                        <CountUp start={0} end={recovered} duration={2.5} separator=','/>
                    </Typography>
                    <Typography color="textSecondary" >{new Date(lastUpdated).toDateString()}</Typography>
                    <Typography variant='body2' >Number of recoveries from COVID-19</Typography>
                </CardContent>
            </Grid>
            <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.deaths)}>
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>Deaths</Typography>
                    <Typography variant='h5' >
                        <CountUp start={0} end={deaths} duration={2.5} separator=','/>
                    </Typography>
                    <Typography color="textSecondary" >{new Date(lastUpdated).toDateString()}</Typography>
                    <Typography variant='body2' >Number of deaths from COVID-19</Typography>
                </CardContent>
            </Grid>

        </Grid>
    </div>
)
}