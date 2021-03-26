build :
				docker-compose -f docker-compose.dev.yml build --force-rm --no-cache

start :
				docker-compose -f docker-compose.dev.yml up

stop :
				docker-compose down
				
debug :
				docker-compose -f docker-compose.dev.yml --verbose up

reload:
				docker-compose down && docker-compose -f docker-compose.dev.yml up

lint :
				cd backend && yarn lint && cd ../frontend && yarn lint && cd ..
				
lint-frontend :
				cd frontend && yarn lint && cd ..
				
lint-backend:
				cd backend && yarn lint && cd ..

start-prod :
				docker-compose up -d

debug-prod:
				docker-compose --verbose up

prune :
				docker container prune -f
				
image-prune :
				docker images prune -f

rmi :
				docker rmi figure_backend & docker rmi figure_frontend & docker rmi figure_nginx

start-watchtower :
				docker run -d \
                --name watchtower \
                -v /var/run/docker.sock:/var/run/docker.sock \
                containrrr/watchtower \
                --interval 30

stop-watchtower :
				docker stop watchtower

rm-watchtower :
				docker rm watchtower

rmi-watchtower :
				docker rmi containrrr/watchtower
